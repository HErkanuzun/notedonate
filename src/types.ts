export interface Note {
  id: number;
  title: string;
  subject: string;
  author: string;
  date: string;
  likes: number;
  downloads: number;
  imageUrl: string;
  content?: string;
}

export interface Exam {
  id: number;
  title: string;
  subject: string;
  professor: string;
  term: string;
  year: string;
  likes: number;
  downloads: number;
  content?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio?: string;
  university?: string;
  department?: string;
  joinDate: string;
  notes: Note[];
  exams: Exam[];
  followers: number;
  following: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}