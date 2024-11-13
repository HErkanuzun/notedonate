import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, AuthState } from '../types';
import { toast } from 'react-toastify';
import { useLanguage } from './LanguageContext';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isOnline: boolean;
  retryConnection: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const RETRY_DELAY = 2000; // 2 seconds
const MAX_RETRIES = 3;
const OFFLINE_CACHE_KEY = 'auth_user_cache';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
    error: null
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const retryCount = useRef(0);
  const authUnsubscribe = useRef<(() => void) | null>(null);
  const { currentLanguage } = useLanguage();

  // Cache user data for offline access
  const cacheUserData = useCallback((userData: User | null) => {
    if (userData) {
      localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(OFFLINE_CACHE_KEY);
    }
  }, []);

  // Get cached user data
  const getCachedUserData = useCallback((): User | null => {
    const cached = localStorage.getItem(OFFLINE_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }, []);

  // Network status monitoring with reconnection logic
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (retryCount.current > 0) {
        retryConnection();
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      // Use cached data when offline
      const cachedUser = getCachedUserData();
      if (cachedUser) {
        setState(prev => ({
          ...prev,
          user: cachedUser,
          isLoggedIn: true,
          loading: false
        }));
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [getCachedUserData]);

  const retryConnection = useCallback(() => {
    if (retryCount.current >= MAX_RETRIES) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Maximum retry attempts reached. Please refresh the page.'
      }));
      return;
    }

    setTimeout(() => {
      retryCount.current += 1;
      initializeAuth();
    }, RETRY_DELAY * retryCount.current);
  }, []);

  const initializeAuth = useCallback(async () => {
    if (!auth) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Firebase authentication is not initialized'
      }));
      return;
    }

    try {
      // Clean up previous listener if it exists
      if (authUnsubscribe.current) {
        authUnsubscribe.current();
      }

      // Set default persistence to local
      await setPersistence(auth, browserLocalPersistence);

      authUnsubscribe.current = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (firebaseUser) {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            let userData: User;
            
            if (userDoc.exists()) {
              const docData = userDoc.data() as Omit<User, 'id'>;
              userData = {
                id: firebaseUser.uid,
                email: firebaseUser.email!,
                name: docData.name || firebaseUser.displayName || '',
                avatar: docData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&auto=format&fit=crop&crop=face',
                ...docData
              };
            } else {
              userData = {
                id: firebaseUser.uid,
                email: firebaseUser.email!,
                name: firebaseUser.displayName || '',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&auto=format&fit=crop&crop=face',
                bio: '',
                university: '',
                department: '',
                joinDate: new Date().toISOString(),
                notes: [],
                exams: [],
                followers: 0,
                following: 0
              };

              await setDoc(userDocRef, userData);
            }

            // Cache user data for offline access
            cacheUserData(userData);

            setState({
              isLoggedIn: true,
              user: userData,
              loading: false,
              error: null
            });

            // Reset retry count on successful auth
            retryCount.current = 0;
          } else {
            cacheUserData(null);
            setState({
              isLoggedIn: false,
              user: null,
              loading: false,
              error: null
            });
          }
        } catch (error: any) {
          console.error('Auth state change error:', error);
          
          if (error.code === 'unavailable') {
            if (isOnline) {
              retryConnection();
            }
            // Use cached data if available
            const cachedUser = getCachedUserData();
            if (cachedUser) {
              setState(prev => ({
                ...prev,
                user: cachedUser,
                isLoggedIn: true,
                loading: false
              }));
            }
          } else {
            setState(prev => ({
              ...prev,
              loading: false,
              error: 'Authentication error occurred',
              // Maintain current session if user exists
              isLoggedIn: !!prev.user,
              user: prev.user
            }));
          }
        }
      });
    } catch (error) {
      console.error('Auth provider setup error:', error);
      // Use cached data if available during initialization error
      const cachedUser = getCachedUserData();
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to initialize authentication',
        isLoggedIn: !!cachedUser,
        user: cachedUser
      }));
    }
  }, [isOnline, retryConnection, cacheUserData, getCachedUserData]);

  useEffect(() => {
    initializeAuth();
    return () => {
      if (authUnsubscribe.current) {
        authUnsubscribe.current();
      }
    };
  }, [initializeAuth]);

  const login = useCallback(async (email: string, password: string, rememberMe = true) => {
    if (!auth) {
      throw new Error('Authentication is not initialized');
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Set persistence based on remember me option
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(currentLanguage === 'TR' ? 'Giriş başarılı!' : 'Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Login failed. Please check your credentials and try again.';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      toast.error(currentLanguage === 'TR' ? 'Giriş başarısız!' : 'Login failed!');
      throw error;
    }
  }, [currentLanguage]);

  const register = useCallback(async (email: string, password: string, name: string) => {
    if (!auth) {
      throw new Error('Authentication is not initialized');
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(firebaseUser, { displayName: name });
      
      const userData: User = {
        id: firebaseUser.uid,
        email,
        name,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&auto=format&fit=crop&crop=face',
        bio: '',
        university: '',
        department: '',
        joinDate: new Date().toISOString(),
        notes: [],
        exams: [],
        followers: 0,
        following: 0
      };

      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userDocRef, userData);
      
      // Cache user data immediately after registration
      cacheUserData(userData);
      
      toast.success(currentLanguage === 'TR' ? 'Kayıt başarılı!' : 'Registration successful!');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Registration failed. Please try again.';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      toast.error(currentLanguage === 'TR' ? 'Kayıt başarısız!' : 'Registration failed!');
      throw error;
    }
  }, [currentLanguage, cacheUserData]);

  const logout = useCallback(async () => {
    if (!auth) {
      throw new Error('Authentication is not initialized');
    }

    try {
      await signOut(auth);
      // Clear cached user data on logout
      cacheUserData(null);
      toast.success(currentLanguage === 'TR' ? 'Çıkış yapıldı!' : 'Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(currentLanguage === 'TR' ? 'Çıkış yapılamadı!' : 'Logout failed!');
      throw error;
    }
  }, [currentLanguage, cacheUserData]);

  const updateUserProfile = useCallback(async (data: Partial<User>) => {
    if (!auth?.currentUser) {
      throw new Error('No authenticated user');
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (data.name) {
        await updateProfile(auth.currentUser, { displayName: data.name });
      }

      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, data, { merge: true });
      
      if (state.user) {
        const updatedUser = { ...state.user, ...data };
        setState(prev => ({
          ...prev,
          user: updatedUser,
          loading: false
        }));
        // Update cached user data
        cacheUserData(updatedUser);
      }
      
      toast.success(currentLanguage === 'TR' ? 'Profil güncellendi!' : 'Profile updated successfully!');
    } catch (error: any) {
      console.error('Profile update error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Profile update failed. Please try again.';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      toast.error(currentLanguage === 'TR' ? 'Profil güncellenemedi!' : 'Profile update failed!');
      throw error;
    }
  }, [state.user, currentLanguage, cacheUserData]);

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        logout, 
        register, 
        updateUserProfile, 
        isOnline,
        retryConnection 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}