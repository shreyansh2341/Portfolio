import { Globe, BrainCircuit, ShieldAlert, BookOpen, UserCheck, MessageSquare, Newspaper, AlertTriangle } from 'lucide-react';

export const PROJECTS = [
  {
    title: 'ACCU DESIGN',
    role: 'MERN Service Platform',
    category: 'Full-Stack',
    duration: 'Oct 2024 - Present',
    description: 'A production-grade, enterprise-scale service platform serving real users. Features role-based access control (RBAC), multi-role admin/user dashboards, JWT secured authentication, and real-time order lifecycle tracking.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Vercel', 'Heroku'],
    github: 'https://github.com/shreyansh2341/accudesign.in',
    live: 'https://accudesign.in',
    color: '#00d9ff', // cyan
    icon: Globe
  },
  {
    title: 'UPI Fraud Detection',
    role: 'AI & Deep Learning Security',
    category: 'AI/ML',
    duration: '2025',
    description: 'Hybrid machine learning architecture combining Deep Learning (LSTM & Autoencoders) with Ensemble models (XGBoost, Random Forest) to identify fraudulent UPI transaction patterns in real-time. Built using PaySim dataset.',
    tech: ['Python', 'TensorFlow/Keras', 'XGBoost', 'Random Forest', 'Pandas', 'NumPy'],
    github: 'https://github.com/shreyansh2341/Fraud_Detection_Model_Paysim_CC',
    color: '#a78bfa', // violet
    icon: BrainCircuit
  },
  {
    title: 'Tejas CRM',
    role: 'Full-Stack Contact & Task Manager',
    category: 'Full-Stack',
    duration: '2026',
    description: 'A modern, full-stack Contact and Task management application designed to bring clarity to workflows. Features address book management, task tracking with status codes (Red/Amber/Green), automatic email simulation logging, and secure JWT-based access with a 15-minute sliding session and idle auto-logout.',
    tech: ['React (Vite)', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'Bcrypt', 'Axios', 'React Toastify'],
    github: 'https://github.com/shreyansh2341/Tejas_CRM',
    color: '#f59e0b', // amber
    icon: ShieldAlert
  },
  {
    title: 'Library Management',
    role: 'Role-Based Digital Platform',
    category: 'Full-Stack',
    duration: '2024',
    description: 'A digital portal with separate user/admin interfaces. Supports JWT-secured session management, book borrowing/return surveillance, dynamic catalog searching, borrowing workflows, and optimized many-to-many book-user DB schemas.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Mongoose', 'Git'],
    github: 'https://github.com/shreyansh2341/Library_Management_System',
    color: '#10b981', // emerald
    icon: BookOpen
  },
  {
    title: 'AI BMI Advisor',
    role: 'Personalized Health AI',
    category: 'AI/ML',
    duration: '2025',
    description: 'An intelligent wellness calculator that evaluates users Body Mass Index and leverages custom heuristic neural networks to suggest dietary and workout recommendations based on their health profiles.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Heuristics AI', 'Responsive Design'],
    github: 'https://github.com/shreyansh2341/AI-Based-BMI-Calculation',
    color: '#f43f5e', // rose
    icon: UserCheck
  },
  {
    title: 'Verbal AI ChatBot',
    role: 'NLP Speech Assistant',
    category: 'AI/ML',
    duration: '2025',
    description: 'An interactive chatbot using Natural Language Processing and browser Web Speech APIs to conduct verbal and voice-synthesized conversations with the user, supporting basic offline assistant operations.',
    tech: ['JavaScript', 'Web Speech API', 'NLP', 'CSS Variables'],
    github: 'https://github.com/shreyansh2341/AI-Chat-Bot',
    color: '#3b82f6', // blue
    icon: MessageSquare
  },
  {
    title: 'Blogs Management',
    role: 'Blogging Dashboard',
    category: 'Full-Stack',
    duration: '2025',
    description: 'A clean blogging website targeting non-technical content creators. Simplifies online publishing via a form-based editing dashboard, Markdown parser, and layout preview tools.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js'],
    github: 'https://github.com/shreyansh2341/Blogs-Management',
    color: '#8b5cf6', // purple
    icon: Newspaper
  }
];
