
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export enum UserRole {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
  PARENT = "parent",
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
