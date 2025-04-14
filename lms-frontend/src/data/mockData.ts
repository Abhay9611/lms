
import { Subject, Book, Topic, Content, ContentType, Assignment, Progress } from '@/types';

// Subjects
export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    description: 'Explore numbers, algebra, geometry, and calculus concepts.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Science',
    description: 'Discover physics, chemistry, biology, and earth sciences.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Literature',
    description: 'Study classic and contemporary literary works and analysis.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2574&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'History',
    description: 'Learn about world history, civilizations, and historical events.',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2674&auto=format&fit=crop',
  },
];

// Books
export const books: Book[] = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    author: 'Dr. Emily Johnson',
    description: 'A comprehensive introduction to algebraic concepts, equations, and problem-solving techniques.',
    coverImageUrl: 'https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?q=80&w=2787&auto=format&fit=crop',
    subjectId: '1',
  },
  {
    id: '2',
    title: 'Geometry Essentials',
    author: 'Prof. Michael Smith',
    description: 'Explore shapes, angles, and spatial relationships in this foundational geometry textbook.',
    coverImageUrl: 'https://images.unsplash.com/photo-1602721288048-a4cc338cb2a8?q=80&w=2787&auto=format&fit=crop',
    subjectId: '1',
  },
  {
    id: '3',
    title: 'Physics: Motion and Forces',
    author: 'Dr. Robert Chen',
    description: 'Understanding the fundamental principles of motion, forces, and energy in the physical world.',
    coverImageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=2574&auto=format&fit=crop',
    subjectId: '2',
  },
  {
    id: '4',
    title: 'Introduction to Biology',
    author: 'Dr. Sarah Williams',
    description: 'A comprehensive overview of living organisms, cells, genetics, and ecosystems.',
    coverImageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2670&auto=format&fit=crop',
    subjectId: '2',
  },
  {
    id: '5',
    title: 'Classic Literature Anthology',
    author: 'Prof. Elizabeth Davis',
    description: 'A collection of timeless literary works spanning different periods and cultures.',
    coverImageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop',
    subjectId: '3',
  },
  {
    id: '6',
    title: 'World History: Ancient Civilizations',
    author: 'Dr. James Thompson',
    description: 'Explore the rise and fall of major civilizations from prehistory to the Middle Ages.',
    coverImageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=2669&auto=format&fit=crop',
    subjectId: '4',
  },
];

// Topics
export const topics: Topic[] = [
  {
    id: '1',
    title: 'Linear Equations',
    description: 'Understanding and solving linear equations with one variable.',
    bookId: '1',
  },
  {
    id: '2',
    title: 'Quadratic Equations',
    description: 'Working with second-degree polynomial equations.',
    bookId: '1',
  },
  {
    id: '3',
    title: 'Triangles and Polygons',
    description: 'Properties of triangles and other polygons.',
    bookId: '2',
  },
  {
    id: '4',
    title: 'Newton\'s Laws of Motion',
    description: 'Fundamental principles governing the motion of objects.',
    bookId: '3',
  },
];

// Content
export const contents: Content[] = [
  {
    id: '1',
    title: 'Linear Equations Introduction',
    type: ContentType.PDF,
    url: '/content/linear-equations-intro.pdf',
    topicId: '1',
  },
  {
    id: '2',
    title: 'Solving Linear Equations',
    type: ContentType.VIDEO,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    topicId: '1',
  },
  {
    id: '3',
    title: 'Linear Equations Quiz',
    type: ContentType.QUIZ,
    url: '/quizzes/linear-equations',
    topicId: '1',
  },
];

// Assignments
export const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Algebra Week 1 Homework',
    description: 'Complete exercises 1-10 on page 25 of the textbook.',
    dueDate: new Date('2025-04-15'),
    bookId: '1',
    teacherId: 'teacher-1',
  },
  {
    id: '2',
    title: 'Geometry Project',
    description: 'Create a presentation on the properties of triangles.',
    dueDate: new Date('2025-04-22'),
    bookId: '2',
    teacherId: 'teacher-1',
  },
];

// Progress
export const progress: Progress[] = [
  {
    id: '1',
    userId: 'student-1',
    contentId: '1',
    completed: true,
    lastAccessed: new Date('2025-04-01'),
  },
  {
    id: '2',
    userId: 'student-1',
    contentId: '2',
    completed: true,
    lastAccessed: new Date('2025-04-02'),
  },
  {
    id: '3',
    userId: 'student-1',
    contentId: '3',
    completed: true,
    score: 85,
    lastAccessed: new Date('2025-04-03'),
  },
];

// Stats for dashboards
export const adminStats = [
  { label: 'Schools', value: 12 },
  { label: 'Teachers', value: 87 },
  { label: 'Students', value: 2453 },
  { label: 'Books', value: 156 },
];

export const teacherStats = [
  { label: 'Classes', value: 4 },
  { label: 'Students', value: 98 },
  { label: 'Assignments', value: 12 },
  { label: 'Avg. Grade', value: '87%' },
];

export const studentStats = [
  { label: 'Subjects', value: 6 },
  { label: 'Books', value: 14 },
  { label: 'Completed', value: '68%' },
  { label: 'Avg. Score', value: '92%' },
];

export const parentStats = [
  { label: 'Children', value: 2 },
  { label: 'Subjects', value: 8 },
  { label: 'Progress', value: '75%' },
  { label: 'Avg. Grade', value: 'B+' },
];
