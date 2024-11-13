import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    
    return {
      user: userDoc.data() as User,
      token: await userCredential.user.getIdToken()
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const userData: User = {
      id: userCredential.user.uid,
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

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    
    return {
      user: userData,
      token: await userCredential.user.getIdToken()
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      unsubscribe();
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            resolve(userDoc.data() as User);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  });
};