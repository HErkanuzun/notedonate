import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, AuthState } from '../types';
import { toast } from 'react-toastify';
import { useLanguage } from './LanguageContext';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isOnline: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
    error: null
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { currentLanguage } = useLanguage();

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as Omit<User, 'id'>;
            setState({
              isLoggedIn: true,
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email!,
                name: userData.name || firebaseUser.displayName || '',
                avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&auto=format&fit=crop&crop=face',
                ...userData
              },
              loading: false,
              error: null
            });
          } else {
            // Create default user document if it doesn't exist
            const defaultUserData: Omit<User, 'id'> = {
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

            await setDoc(userDocRef, defaultUserData);

            setState({
              isLoggedIn: true,
              user: {
                id: firebaseUser.uid,
                ...defaultUserData
              },
              loading: false,
              error: null
            });
          }
        } else {
          setState({
            isLoggedIn: false,
            user: null,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Authentication error occurred. Please try again later.'
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(currentLanguage === 'TR' ? 'Giriş başarılı!' : 'Login successful!');
    } catch (error) {
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
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(firebaseUser, { displayName: name });
      
      const userData: Omit<User, 'id'> = {
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
      
      toast.success(currentLanguage === 'TR' ? 'Kayıt başarılı!' : 'Registration successful!');
    } catch (error) {
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
  }, [currentLanguage]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      toast.success(currentLanguage === 'TR' ? 'Çıkış yapıldı!' : 'Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(currentLanguage === 'TR' ? 'Çıkış yapılamadı!' : 'Logout failed!');
      throw error;
    }
  }, [currentLanguage]);

  const updateUserProfile = useCallback(async (data: Partial<User>) => {
    if (!auth.currentUser) {
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
        setState(prev => ({
          ...prev,
          user: { ...prev.user!, ...data },
          loading: false
        }));
      }
      
      toast.success(currentLanguage === 'TR' ? 'Profil güncellendi!' : 'Profile updated successfully!');
    } catch (error) {
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
  }, [state.user, currentLanguage]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, updateUserProfile, isOnline }}>
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