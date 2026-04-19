import Language from '../models/Language.js';
import Lesson from '../models/Lesson.js';
import Quiz from '../models/Quiz.js';
import Progress from '../models/Progress.js';

export const getLanguages = async (req, res) => {
    try {
        const languages = await Language.find({});
        res.json(languages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLessonsByLanguage = async (req, res) => {
    try {
        const lessons = await Lesson.find({ languageId: req.params.languageId });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getQuizzesByLesson = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ lessonId: req.params.lessonId });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProgress = async (req, res) => {
    try {
        // middleware will inject req.user
        const progress = await Progress.findOne({ userId: req.user._id }).populate('completedLessons');
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProgress = async (req, res) => {
    try {
        const { lessonId, score } = req.body;
        const progress = await Progress.findOne({ userId: req.user._id });

        if (lessonId && !progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
        }
        if (score) {
            progress.quizScore += score;
        }

        // naive streak update
        progress.streakDays = progress.streakDays > 0 ? progress.streakDays : 1;
        
        await progress.save();
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ADMIN CRUD OPERATIONS ---

// Languages
export const createLanguage = async (req, res) => {
    try {
        const language = await Language.create(req.body);
        res.status(201).json(language);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateLanguage = async (req, res) => {
    try {
        const language = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(language);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteLanguage = async (req, res) => {
    try {
        await Language.findByIdAndDelete(req.params.id);
        res.json({ message: 'Language deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lessons
export const createLesson = async (req, res) => {
    try {
        const lesson = await Lesson.create(req.body);
        res.status(201).json(lesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(lesson);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteLesson = async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Quizzes
export const createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteQuiz = async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.json({ message: 'Quiz deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
