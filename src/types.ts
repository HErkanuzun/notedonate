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
  university: string;
  department: string;
  year: string;
  semester: string;
  isFavorite?: boolean;
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
  university: string;
  department: string;
  questions?: Question[];
  isFavorite?: boolean;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  downloads: number;
  content: string;
  tags: string[];
  isFavorite?: boolean;
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
  articles?: Article[];
  favorites?: {
    notes: number[];
    exams: number[];
    articles: number[];
  };
  followers: number;
  following: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface FilterOptions {
  university?: string;
  department?: string;
  year?: string;
  semester?: string;
  sortBy?: 'date' | 'likes' | 'downloads';
  sortOrder?: 'asc' | 'desc';
}