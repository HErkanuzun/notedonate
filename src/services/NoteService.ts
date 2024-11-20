import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Note } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const uploadNote = async (noteData: Omit<Note, 'id'>, file: File) => {
  try {
    // Generate unique ID for storage path
    const fileId = uuidv4();
    const fileRef = ref(storage, `notes/${fileId}`);

    // Upload file to Firebase Storage
    const uploadResult = await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(uploadResult.ref);

    // Add note data to Firestore
    const docRef = await addDoc(collection(db, 'notes'), {
      ...noteData,
      fileUrl,
      fileName: file.name,
      fileId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      id: docRef.id,
      ...noteData,
      fileUrl,
      fileName: file.name,
      fileId
    };
  } catch (error) {
    console.error('Note upload error:', error);
    throw new Error('Failed to upload note');
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
    throw new Error('Failed to fetch notes');
  }
};

export const updateNote = async (noteId: string, updates: Partial<Note>, file?: File) => {
  try {
    const noteRef = doc(db, 'notes', noteId);
    const noteDoc = await noteRef.get();
    const noteData = noteDoc.data();

    let fileUrl = updates.fileUrl;
    let fileId = noteData?.fileId;

    if (file) {
      // Delete old file if it exists
      if (fileId) {
        const oldFileRef = ref(storage, `notes/${fileId}`);
        try {
          await deleteObject(oldFileRef);
        } catch (error) {
          console.error('Error deleting old file:', error);
        }
      }

      // Upload new file
      fileId = uuidv4();
      const fileRef = ref(storage, `notes/${fileId}`);
      const uploadResult = await uploadBytes(fileRef, file);
      fileUrl = await getDownloadURL(uploadResult.ref);
    }

    await updateDoc(noteRef, {
      ...updates,
      fileUrl,
      fileId,
      fileName: file?.name || noteData?.fileName,
      updatedAt: new Date().toISOString()
    });

    return {
      id: noteId,
      ...updates,
      fileUrl,
      fileId,
      fileName: file?.name || noteData?.fileName
    };
  } catch (error) {
    console.error('Update note error:', error);
    throw new Error('Failed to update note');
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    const noteRef = doc(db, 'notes', noteId);
    const noteDoc = await noteRef.get();
    const noteData = noteDoc.data();

    // Delete file from storage if it exists
    if (noteData?.fileId) {
      const fileRef = ref(storage, `notes/${noteData.fileId}`);
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }

    // Delete note document
    await deleteDoc(noteRef);
  } catch (error) {
    console.error('Delete note error:', error);
    throw new Error('Failed to delete note');
  }
};