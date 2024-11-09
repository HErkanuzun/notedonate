import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, enableNetwork, disableNetwork } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, AuthState } from '../types';

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

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      try {
        await enableNetwork(db);
      } catch (error) {
        console.error('Error enabling network:', error);
      }
    };

    const handleOffline = async () => {
      setIsOnline(false);
      try {
        await disableNetwork(db);
      } catch (error) {
        console.error('Error disabling network:', error);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};

    const setupAuthListener = async () => {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
              // Handle case where user exists in Auth but not in Firestore
              setState({
                isLoggedIn: true,
                user: {
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
          // Keep existing session state on error
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Authentication error occurred'
          }));
        }
      });
    };

    setupAuthListener();
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      throw error;
    }
  }, []);

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
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  const updateUserProfile = useCallback(async (data: Partial<User>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      if (!auth.currentUser) throw new Error('No authenticated user');
      
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
      throw error;
    }
  }, [state.user]);

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