import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Note } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const uploadNote = async (note: Omit<Note, 'id'>, file: File) => {
  try {
    // PDF dosyasını Storage'a yükle
    const fileId = uuidv4();
    const fileRef = ref(storage, `notes/${fileId}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);

    // Note verisini Firestore'a ekle
    const noteData = {
      ...note,
      fileUrl,
      uploadDate: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'notes'), noteData);
    return { id: docRef.id, ...noteData };
  } catch (error) {
    console.error('Note upload error:', error);
    throw error;
  }
};

export const getNotes = async (userId?: string) => {
  try {
    let q = collection(db, 'notes');
    
    if (userId) {
      q = query(q, where('authorId', '==', userId));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Note[];
  } catch (error) {
    console.error('Get notes error:', error);
    throw error;
  }
};

export const updateNote = async (noteId: string, updates: Partial<Note>) => {
  try {
    const noteRef = doc(db, 'notes', noteId);
    await updateDoc(noteRef, updates);
  } catch (error) {
    console.error('Update note error:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    await deleteDoc(doc(db, 'notes', noteId));
  } catch (error) {
    console.error('Delete note error:', error);
    throw error;
  }
};