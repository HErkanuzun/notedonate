import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserStats } from '../types';

export const getUserStats = async (userId: string): Promise<UserStats | null> => {
  try {
    const statsRef = doc(db, 'userStats', userId);
    const statsDoc = await getDoc(statsRef);
    
    if (statsDoc.exists()) {
      return statsDoc.data() as UserStats;
    }
    
    // Initialize stats if they don't exist
    const initialStats: UserStats = {
      activeTime: 0,
      notesAdded: 0,
      examsCreated: 0,
      examsCompleted: 0,
      lastActive: new Date().toISOString(),
      joinDate: new Date().toISOString(),
      totalLikes: 0,
      totalDownloads: 0,
      streak: 0
    };
    
    await setDoc(statsRef, initialStats);
    return initialStats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
};

export const updateUserStats = async (userId: string, updates: Partial<UserStats>) => {
  try {
    const statsRef = doc(db, 'userStats', userId);
    await updateDoc(statsRef, updates);
  } catch (error) {
    console.error('Error updating user stats:', error);
    throw error;
  }
};

export const incrementUserStats = async (userId: string, field: keyof UserStats) => {
  try {
    const statsRef = doc(db, 'userStats', userId);
    await updateDoc(statsRef, {
      [field]: increment(1),
      lastActive: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error incrementing user stats:', error);
    throw error;
  }
};

export const updateActiveTime = async (userId: string, minutes: number) => {
  try {
    const statsRef = doc(db, 'userStats', userId);
    await updateDoc(statsRef, {
      activeTime: increment(minutes),
      lastActive: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating active time:', error);
    throw error;
  }
};

export const updateStreak = async (userId: string) => {
  try {
    const statsRef = doc(db, 'userStats', userId);
    const statsDoc = await getDoc(statsRef);
    
    if (!statsDoc.exists()) return;
    
    const stats = statsDoc.data() as UserStats;
    const lastActive = new Date(stats.lastActive);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
    
    let newStreak = stats.streak;
    if (diffDays === 1) {
      // Consecutive day
      newStreak += 1;
    } else if (diffDays > 1) {
      // Streak broken
      newStreak = 1;
    }
    
    await updateDoc(statsRef, {
      streak: newStreak,
      lastActive: today.toISOString()
    });
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
};