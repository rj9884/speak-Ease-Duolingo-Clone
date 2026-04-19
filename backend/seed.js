import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Language from './models/Language.js';
import Lesson from './models/Lesson.js';
import Quiz from './models/Quiz.js';
import User from './models/User.js';
import Progress from './models/Progress.js';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/speakease');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();
        await Language.deleteMany();
        await Lesson.deleteMany();
        await Quiz.deleteMany();
        await User.deleteMany();
        await Progress.deleteMany();

        // 1. Create Users
        const users = await User.insertMany([
            { name: 'Sarah', email: 'sarah@example.com', password: 'password123', role: 'user' },
            { name: 'John', email: 'john@example.com', password: 'password123', role: 'user' },
            { name: 'Admin', email: 'admin@example.com', password: 'adminpassword', role: 'admin' }
        ]);

        // 2. Create Languages
        const langs = await Language.insertMany([
            { languageName: 'Spanish', level: 'Beginner', description: 'Basic Spanish lessons for beginners' },
            { languageName: 'French', level: 'Beginner', description: 'Basic French lessons for beginners' },
            { languageName: 'German', level: 'Beginner', description: 'Basic German lessons for beginners' },
            { languageName: 'Japanese', level: 'Beginner', description: 'Basic Japanese lessons for beginners' },
            { languageName: 'English', level: 'Beginner', description: 'Basic English lessons for beginners' },
            { languageName: 'Italian', level: 'Beginner', description: 'Basic Italian lessons for beginners' }
        ]);

        // 3. Create Lessons
        const spanishLessons = await Lesson.insertMany([
            {
                title: 'Greetings in Spanish',
                description: 'Learn basic greetings and introductions',
                languageId: langs[0]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Hola', translation: 'Hello' },
                    { word: 'Buenos días', translation: 'Good morning' },
                    { word: 'Adiós', translation: 'Goodbye' }
                ]
            },
            {
                title: 'Numbers 1-10',
                description: 'Learn to count from 1 to 10 in Spanish',
                languageId: langs[0]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Uno', translation: 'One' },
                    { word: 'Dos', translation: 'Two' },
                    { word: 'Tres', translation: 'Three' }
                ]
            }
        ]);

        const frenchLessons = await Lesson.insertMany([
            {
                title: 'Greetings in French',
                description: 'Learn basic greetings and introductions',
                languageId: langs[1]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Bonjour', translation: 'Hello' },
                    { word: 'Merci', translation: 'Thank you' },
                    { word: 'Au revoir', translation: 'Goodbye' }
                ]
            }
        ]);
        
        const germanLessons = await Lesson.insertMany([
            {
                title: 'Greetings in German',
                description: 'Learn basic greetings and introductions',
                languageId: langs[2]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Hallo', translation: 'Hello' },
                    { word: 'Danke', translation: 'Thank you' },
                    { word: 'Tschüss', translation: 'Goodbye' }
                ]
            }
        ]);

        const japaneseLessons = await Lesson.insertMany([
            {
                title: 'Greetings in Japanese',
                description: 'Learn basic greetings and introductions',
                languageId: langs[3]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Konnichiwa', translation: 'Hello' },
                    { word: 'Arigatou', translation: 'Thank you' },
                    { word: 'Sayonara', translation: 'Goodbye' }
                ]
            }
        ]);

        const englishLessons = await Lesson.insertMany([
            {
                title: 'Greetings in English',
                description: 'Learn basic greetings and introductions',
                languageId: langs[4]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Hello', translation: 'Hello' },
                    { word: 'Good morning', translation: 'Good morning' },
                    { word: 'Goodbye', translation: 'Goodbye' }
                ]
            }
        ]);

        const italianLessons = await Lesson.insertMany([
            {
                title: 'Greetings in Italian',
                description: 'Learn basic greetings and introductions',
                languageId: langs[5]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Ciao', translation: 'Hello' },
                    { word: 'Grazie', translation: 'Thank you' },
                    { word: 'Arrivederci', translation: 'Goodbye' }
                ]
            }
        ]);

        // 4. Create Quizzes
        await Quiz.insertMany([
            // Spanish Quizzes
            {
                lessonId: spanishLessons[0]._id,
                question: 'What is the Spanish word for Hello?',
                options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
                correctAnswer: 'Hola'
            },
            {
                lessonId: spanishLessons[0]._id,
                question: 'What does "Buenos días" mean?',
                options: ['Good evening', 'Good morning', 'Goodbye', 'Good night'],
                correctAnswer: 'Good morning'
            },
            {
                lessonId: spanishLessons[1]._id,
                question: 'What is the Spanish word for One?',
                options: ['Uno', 'Dos', 'Tres', 'Cuatro'],
                correctAnswer: 'Uno'
            },
            // French Quizzes
            {
                lessonId: frenchLessons[0]._id,
                question: 'What is the French word for Hello?',
                options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'],
                correctAnswer: 'Bonjour'
            },
            // German Quizzes
            {
                lessonId: germanLessons[0]._id,
                question: 'What is the German word for Thank you?',
                options: ['Danke', 'Bitte', 'Hallo', 'Tschüss'],
                correctAnswer: 'Danke'
            },
            // Japanese Quizzes
            {
                lessonId: japaneseLessons[0]._id,
                question: 'What is the Japanese word for Hello?',
                options: ['Konnichiwa', 'Arigatou', 'Sayonara', 'Hai'],
                correctAnswer: 'Konnichiwa'
            },
            // English Quizzes
            {
                lessonId: englishLessons[0]._id,
                question: 'What is the English word for Ciao?',
                options: ['Hello', 'Thanks', 'Bye', 'Please'],
                correctAnswer: 'Hello'
            },
            // Italian Quizzes
            {
                lessonId: italianLessons[0]._id,
                question: 'What is the Italian word for Thank you?',
                options: ['Grazie', 'Ciao', 'Prego', 'Scusa'],
                correctAnswer: 'Grazie'
            }
        ]);

        // 5. Create Progress
        await Progress.insertMany([
            {
                userId: users[0]._id, // Sarah
                completedLessons: [spanishLessons[0]._id, spanishLessons[1]._id],
                quizScore: 180,
                streakDays: 5,
                badges: ['Beginner Learner', 'Spanish Starter']
            },
            {
                userId: users[1]._id, // John
                completedLessons: [frenchLessons[0]._id],
                quizScore: 90,
                streakDays: 2,
                badges: ['Beginner Learner']
            }
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
