export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  school?: {
    id: number;
    name: string;
    code: string;
  };
  grade?: {
    id: number;
    name: string;
  };
}

export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  subjectId: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  bookId: string;
}

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  url: string;
  topicId: string;
}

export enum ContentType {
  PDF = "pdf",
  VIDEO = "video",
  QUIZ = "quiz",
}

export interface School {
  id: string;
  name: string;
  address: string;
  adminId: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  bookId: string;
  teacherId: string;
}

export interface Progress {
  id: string;
  userId: string;
  contentId: string;
  completed: boolean;
  score?: number;
  lastAccessed: Date;
}
