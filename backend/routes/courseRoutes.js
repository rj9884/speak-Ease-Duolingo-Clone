import express from 'express';
import { 
    getLanguages, getLessonsByLanguage, getQuizzesByLesson, getProgress, updateProgress,
    createLanguage, updateLanguage, deleteLanguage,
    createLesson, updateLesson, deleteLesson,
    createQuiz, updateQuiz, deleteQuiz
} from '../controllers/courseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/languages', getLanguages);
router.get('/lessons/:languageId', getLessonsByLanguage);
router.get('/quizzes/:lessonId', getQuizzesByLesson);

// Protected User Routes
router.get('/progress', protect, getProgress);
router.post('/progress', protect, updateProgress);

// Protected Admin Routes
router.post('/languages', protect, admin, createLanguage);
router.put('/languages/:id', protect, admin, updateLanguage);
router.delete('/languages/:id', protect, admin, deleteLanguage);

router.post('/lessons', protect, admin, createLesson);
router.put('/lessons/:id', protect, admin, updateLesson);
router.delete('/lessons/:id', protect, admin, deleteLesson);

router.post('/quizzes', protect, admin, createQuiz);
router.put('/quizzes/:id', protect, admin, updateQuiz);
router.delete('/quizzes/:id', protect, admin, deleteQuiz);

export default router;
