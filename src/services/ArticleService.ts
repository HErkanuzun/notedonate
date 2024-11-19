import { collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Article } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const uploadArticle = async (article: Omit<Article, 'id'>, file: File) => {
  try {
    // Upload PDF to Storage
    const fileId = uuidv4();
    const fileRef = ref(storage, `articles/${fileId}`);
    await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(fileRef);

    // Add article data to Firestore
    const articleData = {
      ...article,
      fileUrl,
      uploadDate: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'articles'), articleData);
    return { id: docRef.id, ...articleData };
  } catch (error) {
    console.error('Article upload error:', error);
    throw error;
  }
};

export const getArticles = async (userId?: string) => {
  try {
    let q = collection(db, 'articles');
    
    if (userId) {
      q = query(q, where('authorId', '==', userId));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
  } catch (error) {
    console.error('Get articles error:', error);
    throw error;
  }
};

export const updateArticle = async (articleId: string, updates: Partial<Article>) => {
  try {
    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, updates);
  } catch (error) {
    console.error('Update article error:', error);
    throw error;
  }
};

export const deleteArticle = async (articleId: string) => {
  try {
    await deleteDoc(doc(db, 'articles', articleId));
  } catch (error) {
    console.error('Delete article error:', error);
    throw error;
  }
};