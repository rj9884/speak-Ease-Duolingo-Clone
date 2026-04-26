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
        const users = await User.create([
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
            },
            {
                title: 'Common Colors',
                description: 'Learn basic colors in Spanish',
                languageId: langs[0]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Rojo', translation: 'Red' },
                    { word: 'Azul', translation: 'Blue' },
                    { word: 'Verde', translation: 'Green' }
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
            },
            {
                title: 'Numbers 1-10',
                description: 'Learn to count from 1 to 10 in French',
                languageId: langs[1]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Un', translation: 'One' },
                    { word: 'Deux', translation: 'Two' },
                    { word: 'Trois', translation: 'Three' }
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
            },
            {
                title: 'Numbers 1-10',
                description: 'Learn to count from 1 to 10 in German',
                languageId: langs[2]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Eins', translation: 'One' },
                    { word: 'Zwei', translation: 'Two' },
                    { word: 'Drei', translation: 'Three' }
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
            },
            {
                title: 'Numbers 1-10',
                description: 'Learn to count from 1 to 10 in Japanese',
                languageId: langs[3]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Ichi', translation: 'One' },
                    { word: 'Ni', translation: 'Two' },
                    { word: 'San', translation: 'Three' }
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
            },
            {
                title: 'Numbers 1-10',
                description: 'Learn to count from 1 to 10 in English',
                languageId: langs[4]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'One', translation: 'One' },
                    { word: 'Two', translation: 'Two' },
                    { word: 'Three', translation: 'Three' }
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
            },
            {
                title: 'Numbers 1-10',
                description: 'Learn to count from 1 to 10 in Italian',
                languageId: langs[5]._id,
                difficulty: 'Beginner',
                content: [
                    { word: 'Uno', translation: 'One' },
                    { word: 'Due', translation: 'Two' },
                    { word: 'Tre', translation: 'Three' }
                ]
            }
        ]);

        // 4. Create Quizzes
        await Quiz.insertMany([
            // Spanish Quizzes
            { lessonId: spanishLessons[0]._id, question: 'What is the Spanish word for Hello?', options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'], correctAnswer: 'Hola' },
            { lessonId: spanishLessons[0]._id, question: 'What does "Buenos días" mean?', options: ['Good evening', 'Good morning', 'Goodbye', 'Good night'], correctAnswer: 'Good morning' },
            { lessonId: spanishLessons[0]._id, question: 'What does "Adiós" mean?', options: ['Goodbye', 'Hello', 'Please', 'Sorry'], correctAnswer: 'Goodbye' },
            { lessonId: spanishLessons[0]._id, question: 'Translate "Hello" to Spanish.', options: ['Hola', 'Gracias', 'Por favor', 'Sí'], correctAnswer: 'Hola' },
            { lessonId: spanishLessons[0]._id, question: 'Translate "Good morning" to Spanish.', options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hola'], correctAnswer: 'Buenos días' },
            { lessonId: spanishLessons[1]._id, question: 'What is the Spanish word for One?', options: ['Uno', 'Dos', 'Tres', 'Cuatro'], correctAnswer: 'Uno' },
            { lessonId: spanishLessons[1]._id, question: 'What is the Spanish word for Two?', options: ['Dos', 'Tres', 'Cuatro', 'Cinco'], correctAnswer: 'Dos' },
            { lessonId: spanishLessons[1]._id, question: 'What is the Spanish word for Three?', options: ['Tres', 'Dos', 'Uno', 'Cero'], correctAnswer: 'Tres' },
            { lessonId: spanishLessons[1]._id, question: 'Translate "Uno" to English.', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'One' },
            { lessonId: spanishLessons[1]._id, question: 'Translate "Dos" to English.', options: ['Two', 'Three', 'Four', 'Five'], correctAnswer: 'Two' },
            { lessonId: spanishLessons[2]._id, question: 'What is the Spanish word for Red?', options: ['Rojo', 'Azul', 'Verde', 'Amarillo'], correctAnswer: 'Rojo' },
            { lessonId: spanishLessons[2]._id, question: 'What is the Spanish word for Blue?', options: ['Azul', 'Rojo', 'Verde', 'Blanco'], correctAnswer: 'Azul' },
            { lessonId: spanishLessons[2]._id, question: 'What is the Spanish word for Green?', options: ['Verde', 'Azul', 'Rojo', 'Negro'], correctAnswer: 'Verde' },
            { lessonId: spanishLessons[2]._id, question: 'Translate "Rojo" to English.', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Red' },

            // French Quizzes
            { lessonId: frenchLessons[0]._id, question: 'What is the French word for Hello?', options: ['Hola', 'Bonjour', 'Ciao', 'Hallo'], correctAnswer: 'Bonjour' },
            { lessonId: frenchLessons[0]._id, question: 'What does "Merci" mean?', options: ['Thank you', 'Please', 'Sorry', 'Excuse me'], correctAnswer: 'Thank you' },
            { lessonId: frenchLessons[0]._id, question: 'What does "Au revoir" mean?', options: ['Goodbye', 'Hello', 'Yes', 'No'], correctAnswer: 'Goodbye' },
            { lessonId: frenchLessons[0]._id, question: 'Translate "Hello" to French.', options: ['Bonjour', 'Merci', 'Oui', 'Non'], correctAnswer: 'Bonjour' },
            { lessonId: frenchLessons[0]._id, question: 'Translate "Thank you" to French.', options: ['Merci', 'S\'il vous plaît', 'Pardon', 'Bonjour'], correctAnswer: 'Merci' },
            { lessonId: frenchLessons[0]._id, question: 'Translate "Goodbye" to French.', options: ['Au revoir', 'Salut', 'À bientôt', 'Oui'], correctAnswer: 'Au revoir' },
            { lessonId: frenchLessons[1]._id, question: 'What is the French word for One?', options: ['Un', 'Deux', 'Trois', 'Quatre'], correctAnswer: 'Un' },
            { lessonId: frenchLessons[1]._id, question: 'What is the French word for Two?', options: ['Un', 'Deux', 'Trois', 'Quatre'], correctAnswer: 'Deux' },
            { lessonId: frenchLessons[1]._id, question: 'What is the French word for Three?', options: ['Deux', 'Trois', 'Quatre', 'Cinq'], correctAnswer: 'Trois' },
            { lessonId: frenchLessons[1]._id, question: 'Translate "Un" to English.', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'One' },
            { lessonId: frenchLessons[1]._id, question: 'Translate "Deux" to English.', options: ['Two', 'Three', 'One', 'Four'], correctAnswer: 'Two' },
            { lessonId: frenchLessons[1]._id, question: 'Translate "Trois" to English.', options: ['Three', 'Two', 'Four', 'Five'], correctAnswer: 'Three' },

            // German Quizzes
            { lessonId: germanLessons[0]._id, question: 'What is the German word for Hello?', options: ['Hallo', 'Danke', 'Tschüss', 'Bitte'], correctAnswer: 'Hallo' },
            { lessonId: germanLessons[0]._id, question: 'What is the German word for Thank you?', options: ['Danke', 'Bitte', 'Hallo', 'Tschüss'], correctAnswer: 'Danke' },
            { lessonId: germanLessons[0]._id, question: 'What is the German word for Goodbye?', options: ['Tschüss', 'Hallo', 'Danke', 'Ja'], correctAnswer: 'Tschüss' },
            { lessonId: germanLessons[0]._id, question: 'Translate "Hallo" to English.', options: ['Hello', 'Goodbye', 'Thanks', 'Please'], correctAnswer: 'Hello' },
            { lessonId: germanLessons[0]._id, question: 'Translate "Danke" to English.', options: ['Thank you', 'Please', 'Sorry', 'Hello'], correctAnswer: 'Thank you' },
            { lessonId: germanLessons[0]._id, question: 'Translate "Tschüss" to English.', options: ['Goodbye', 'Hello', 'Yes', 'No'], correctAnswer: 'Goodbye' },
            { lessonId: germanLessons[1]._id, question: 'What is the German word for One?', options: ['Eins', 'Zwei', 'Drei', 'Vier'], correctAnswer: 'Eins' },
            { lessonId: germanLessons[1]._id, question: 'What is the German word for Two?', options: ['Zwei', 'Drei', 'Vier', 'Eins'], correctAnswer: 'Zwei' },
            { lessonId: germanLessons[1]._id, question: 'What is the German word for Three?', options: ['Eins', 'Zwei', 'Drei', 'Vier'], correctAnswer: 'Drei' },
            { lessonId: germanLessons[1]._id, question: 'Translate "Eins" to English.', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'One' },
            { lessonId: germanLessons[1]._id, question: 'Translate "Zwei" to English.', options: ['Two', 'One', 'Three', 'Four'], correctAnswer: 'Two' },
            { lessonId: germanLessons[1]._id, question: 'Translate "Drei" to English.', options: ['Three', 'Two', 'Four', 'One'], correctAnswer: 'Three' },

            // Japanese Quizzes
            { lessonId: japaneseLessons[0]._id, question: 'What is the Japanese word for Hello?', options: ['Konnichiwa', 'Arigatou', 'Sayonara', 'Hai'], correctAnswer: 'Konnichiwa' },
            { lessonId: japaneseLessons[0]._id, question: 'What is the Japanese word for Thank you?', options: ['Arigatou', 'Konnichiwa', 'Sayonara', 'Iie'], correctAnswer: 'Arigatou' },
            { lessonId: japaneseLessons[0]._id, question: 'What is the Japanese word for Goodbye?', options: ['Sayonara', 'Arigatou', 'Hai', 'Konnichiwa'], correctAnswer: 'Sayonara' },
            { lessonId: japaneseLessons[0]._id, question: 'Translate "Konnichiwa" to English.', options: ['Hello', 'Goodbye', 'Thanks', 'Yes'], correctAnswer: 'Hello' },
            { lessonId: japaneseLessons[0]._id, question: 'Translate "Arigatou" to English.', options: ['Thank you', 'Hello', 'Sorry', 'Please'], correctAnswer: 'Thank you' },
            { lessonId: japaneseLessons[0]._id, question: 'Translate "Sayonara" to English.', options: ['Goodbye', 'Hello', 'No', 'Yes'], correctAnswer: 'Goodbye' },
            { lessonId: japaneseLessons[1]._id, question: 'What is the Japanese word for One?', options: ['Ichi', 'Ni', 'San', 'Shi'], correctAnswer: 'Ichi' },
            { lessonId: japaneseLessons[1]._id, question: 'What is the Japanese for Two?', options: ['Ni', 'San', 'Shi', 'Go'], correctAnswer: 'Ni' },
            { lessonId: japaneseLessons[1]._id, question: 'What is the Japanese for Three?', options: ['San', 'Ni', 'Ichi', 'Shi'], correctAnswer: 'San' },
            { lessonId: japaneseLessons[1]._id, question: 'Translate "Ichi" to English.', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'One' },
            { lessonId: japaneseLessons[1]._id, question: 'Translate "Ni" to English.', options: ['Two', 'One', 'Three', 'Four'], correctAnswer: 'Two' },
            { lessonId: japaneseLessons[1]._id, question: 'Translate "San" to English.', options: ['Three', 'Two', 'Four', 'Five'], correctAnswer: 'Three' },

            // English Quizzes
            { lessonId: englishLessons[0]._id, question: 'What is the synonym for "Hello"?', options: ['Hi', 'Bye', 'Thanks', 'Please'], correctAnswer: 'Hi' },
            { lessonId: englishLessons[0]._id, question: 'What is the English word for Ciao?', options: ['Hello', 'Thanks', 'Bye', 'Please'], correctAnswer: 'Hello' },
            { lessonId: englishLessons[0]._id, question: 'What does "Good morning" mean?', options: ['Buen día', 'Buenas tardes', 'Buenas noches', 'Hola'], correctAnswer: 'Buen día' },
            { lessonId: englishLessons[0]._id, question: 'What does "Goodbye" mean?', options: ['Adiós', 'Hola', 'Gracias', 'Sí'], correctAnswer: 'Adiós' },
            { lessonId: englishLessons[0]._id, question: 'How do you say "Adiós" in English?', options: ['Goodbye', 'Hello', 'Morning', 'Thanks'], correctAnswer: 'Goodbye' },
            { lessonId: englishLessons[0]._id, question: 'Translate "Hola" to English.', options: ['Hello', 'Goodbye', 'Please', 'Yes'], correctAnswer: 'Hello' },
            { lessonId: englishLessons[1]._id, question: 'What is the English translation for Deux?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Two' },
            { lessonId: englishLessons[1]._id, question: 'What is the English translation for "Uno"?', options: ['One', 'Two', 'Three', 'Zero'], correctAnswer: 'One' },
            { lessonId: englishLessons[1]._id, question: 'What is the English translation for "Tres"?', options: ['Three', 'Two', 'Four', 'One'], correctAnswer: 'Three' },
            { lessonId: englishLessons[1]._id, question: 'What comes after One?', options: ['Two', 'Three', 'Zero', 'Four'], correctAnswer: 'Two' },
            { lessonId: englishLessons[1]._id, question: 'What comes after Two?', options: ['Three', 'Four', 'Five', 'One'], correctAnswer: 'Three' },
            { lessonId: englishLessons[1]._id, question: 'Translate "Three" to Spanish.', options: ['Tres', 'Dos', 'Uno', 'Cuatro'], correctAnswer: 'Tres' },

            // Italian Quizzes
            { lessonId: italianLessons[0]._id, question: 'What is the Italian word for Hello?', options: ['Ciao', 'Grazie', 'Prego', 'Scusa'], correctAnswer: 'Ciao' },
            { lessonId: italianLessons[0]._id, question: 'What is the Italian word for Thank you?', options: ['Grazie', 'Ciao', 'Prego', 'Scusa'], correctAnswer: 'Grazie' },
            { lessonId: italianLessons[0]._id, question: 'What is the Italian word for Goodbye?', options: ['Arrivederci', 'Ciao', 'Grazie', 'Sì'], correctAnswer: 'Arrivederci' },
            { lessonId: italianLessons[0]._id, question: 'Translate "Ciao" to English.', options: ['Hello', 'Goodbye', 'Thanks', 'Please'], correctAnswer: 'Hello' },
            { lessonId: italianLessons[0]._id, question: 'Translate "Grazie" to English.', options: ['Thank you', 'Please', 'Sorry', 'Hello'], correctAnswer: 'Thank you' },
            { lessonId: italianLessons[0]._id, question: 'Translate "Arrivederci" to English.', options: ['Goodbye', 'Hello', 'Yes', 'No'], correctAnswer: 'Goodbye' },
            { lessonId: italianLessons[1]._id, question: 'What is the Italian word for One?', options: ['Uno', 'Due', 'Tre', 'Quattro'], correctAnswer: 'Uno' },
            { lessonId: italianLessons[1]._id, question: 'What is the Italian word for Two?', options: ['Due', 'Tre', 'Quattro', 'Cinque'], correctAnswer: 'Due' },
            { lessonId: italianLessons[1]._id, question: 'What is the Italian word for Three?', options: ['Uno', 'Due', 'Tre', 'Quattro'], correctAnswer: 'Tre' },
            { lessonId: italianLessons[1]._id, question: 'Translate "Uno" to English.', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'One' },
            { lessonId: italianLessons[1]._id, question: 'Translate "Due" to English.', options: ['Two', 'Three', 'One', 'Four'], correctAnswer: 'Two' },
            { lessonId: italianLessons[1]._id, question: 'Translate "Tre" to English.', options: ['Three', 'Two', 'Four', 'Five'], correctAnswer: 'Three' }
        ]);

        // --- Generate 5 Extra Lessons (with 10 Quizzes Each) Per Language ---
        const topicsData = [
            {
                title: 'Animals',
                desc: 'Learn common animal names',
                words: [
                    { en: 'Dog', es: 'Perro', fr: 'Chien', de: 'Hund', ja: 'Inu', it: 'Cane' },
                    { en: 'Cat', es: 'Gato', fr: 'Chat', de: 'Katze', ja: 'Neko', it: 'Gatto' },
                    { en: 'Bird', es: 'Pájaro', fr: 'Oiseau', de: 'Vogel', ja: 'Tori', it: 'Uccello' },
                    { en: 'Fish', es: 'Pez', fr: 'Poisson', de: 'Fisch', ja: 'Sakana', it: 'Pesce' },
                    { en: 'Mouse', es: 'Ratón', fr: 'Souris', de: 'Maus', ja: 'Nezumi', it: 'Topo' },
                    { en: 'Horse', es: 'Caballo', fr: 'Cheval', de: 'Pferd', ja: 'Uma', it: 'Cavallo' },
                    { en: 'Cow', es: 'Vaca', fr: 'Vache', de: 'Kuh', ja: 'Ushi', it: 'Mucca' },
                    { en: 'Pig', es: 'Cerdo', fr: 'Cochon', de: 'Schwein', ja: 'Buta', it: 'Maiale' },
                    { en: 'Sheep', es: 'Oveja', fr: 'Mouton', de: 'Schaf', ja: 'Hitsuji', it: 'Pecora' },
                    { en: 'Rabbit', es: 'Conejo', fr: 'Lapin', de: 'Hase', ja: 'Usagi', it: 'Coniglio' }
                ]
            },
            {
                title: 'Food',
                desc: 'Learn basic food items',
                words: [
                    { en: 'Apple', es: 'Manzana', fr: 'Pomme', de: 'Apfel', ja: 'Ringo', it: 'Mela' },
                    { en: 'Bread', es: 'Pan', fr: 'Pain', de: 'Brot', ja: 'Pan', it: 'Pane' },
                    { en: 'Water', es: 'Agua', fr: 'Eau', de: 'Wasser', ja: 'Mizu', it: 'Acqua' },
                    { en: 'Milk', es: 'Leche', fr: 'Lait', de: 'Milch', ja: 'Gyunyu', it: 'Latte' },
                    { en: 'Cheese', es: 'Queso', fr: 'Fromage', de: 'Käse', ja: 'Chizu', it: 'Formaggio' },
                    { en: 'Meat', es: 'Carne', fr: 'Viande', de: 'Fleisch', ja: 'Niku', it: 'Carne' },
                    { en: 'Rice', es: 'Arroz', fr: 'Riz', de: 'Reis', ja: 'Gohan', it: 'Riso' },
                    { en: 'Egg', es: 'Huevo', fr: 'Œuf', de: 'Ei', ja: 'Tamago', it: 'Uovo' },
                    { en: 'Potato', es: 'Papa', fr: 'Pomme de terre', de: 'Kartoffel', ja: 'Jagaimo', it: 'Patata' },
                    { en: 'Tomato', es: 'Tomate', fr: 'Tomate', de: 'Tomate', ja: 'Tomato', it: 'Pomodoro' }
                ]
            },
            {
                title: 'Family',
                desc: 'Learn family members',
                words: [
                    { en: 'Mother', es: 'Madre', fr: 'Mère', de: 'Mutter', ja: 'Haha', it: 'Madre' },
                    { en: 'Father', es: 'Padre', fr: 'Père', de: 'Vater', ja: 'Chichi', it: 'Padre' },
                    { en: 'Brother', es: 'Hermano', fr: 'Frère', de: 'Bruder', ja: 'Ani', it: 'Fratello' },
                    { en: 'Sister', es: 'Hermana', fr: 'Sœur', de: 'Schwester', ja: 'Ane', it: 'Sorella' },
                    { en: 'Son', es: 'Hijo', fr: 'Fils', de: 'Sohn', ja: 'Musuko', it: 'Figlio' },
                    { en: 'Daughter', es: 'Hija', fr: 'Fille', de: 'Tochter', ja: 'Musume', it: 'Figlia' },
                    { en: 'Grandmother', es: 'Abuela', fr: 'Grand-mère', de: 'Großmutter', ja: 'Sobo', it: 'Nonna' },
                    { en: 'Grandfather', es: 'Abuelo', fr: 'Grand-père', de: 'Großvater', ja: 'Sofu', it: 'Nonno' },
                    { en: 'Aunt', es: 'Tía', fr: 'Tante', de: 'Tante', ja: 'Oba', it: 'Zia' },
                    { en: 'Uncle', es: 'Tío', fr: 'Oncle', de: 'Onkel', ja: 'Oji', it: 'Zio' }
                ]
            },
            {
                title: 'Colors Added',
                desc: 'Learn additional colors',
                words: [
                    { en: 'Red', es: 'Rojo', fr: 'Rouge', de: 'Rot', ja: 'Aka', it: 'Rosso' },
                    { en: 'Blue', es: 'Azul', fr: 'Bleu', de: 'Blau', ja: 'Ao', it: 'Blu' },
                    { en: 'Green', es: 'Verde', fr: 'Vert', de: 'Grün', ja: 'Midori', it: 'Verde' },
                    { en: 'Yellow', es: 'Amarillo', fr: 'Jaune', de: 'Gelb', ja: 'Kiiro', it: 'Giallo' },
                    { en: 'Black', es: 'Negro', fr: 'Noir', de: 'Schwarz', ja: 'Kuro', it: 'Nero' },
                    { en: 'White', es: 'Blanco', fr: 'Blanc', de: 'Weiß', ja: 'Shiro', it: 'Bianco' },
                    { en: 'Brown', es: 'Marrón', fr: 'Marron', de: 'Braun', ja: 'Chairo', it: 'Marrone' },
                    { en: 'Orange', es: 'Naranja', fr: 'Orange', de: 'Orange', ja: 'Orenji', it: 'Arancione' },
                    { en: 'Purple', es: 'Morado', fr: 'Violet', de: 'Lila', ja: 'Murasaki', it: 'Viola' },
                    { en: 'Pink', es: 'Rosa', fr: 'Rose', de: 'Rosa', ja: 'Pinku', it: 'Rosa' }
                ]
            },
            {
                title: 'Travel',
                desc: 'Learn travel vocabulary',
                words: [
                    { en: 'Car', es: 'Coche', fr: 'Voiture', de: 'Auto', ja: 'Kuruma', it: 'Auto' },
                    { en: 'Bus', es: 'Autobús', fr: 'Bus', de: 'Bus', ja: 'Basu', it: 'Autobus' },
                    { en: 'Train', es: 'Tren', fr: 'Train', de: 'Zug', ja: 'Densha', it: 'Treno' },
                    { en: 'Airplane', es: 'Avión', fr: 'Avion', de: 'Flugzeug', ja: 'Hikouki', it: 'Aereo' },
                    { en: 'Bicycle', es: 'Bicicleta', fr: 'Vélo', de: 'Fahrrad', ja: 'Jitensha', it: 'Bicicletta' },
                    { en: 'Ticket', es: 'Boleto', fr: 'Billet', de: 'Ticket', ja: 'Kippu', it: 'Biglietto' },
                    { en: 'Hotel', es: 'Hotel', fr: 'Hôtel', de: 'Hotel', ja: 'Hoteru', it: 'Hotel' },
                    { en: 'Passport', es: 'Pasaporte', fr: 'Passeport', de: 'Reisepass', ja: 'Pasupoto', it: 'Passaporto' },
                    { en: 'Airport', es: 'Aeropuerto', fr: 'Aéroport', de: 'Flughafen', ja: 'Kukou', it: 'Aeroporto' },
                    { en: 'Station', es: 'Estación', fr: 'Gare', de: 'Bahnhof', ja: 'Eki', it: 'Stazione' }
                ]
            }
        ];

        const langCodes = { 'Spanish': 'es', 'French': 'fr', 'German': 'de', 'Japanese': 'ja', 'English': 'en', 'Italian': 'it' };
        let dynamicallyCreatedLessons = [];

        for (const lang of langs) {
            const code = langCodes[lang.languageName];
            for (const topic of topicsData) {
                const lessonContent = topic.words.map(w => ({
                    word: (lang.languageName === 'English') ? w['en'] : w[code],
                    translation: w['en']
                }));
                dynamicallyCreatedLessons.push({
                    title: topic.title,
                    description: topic.desc,
                    languageId: lang._id,
                    difficulty: 'Beginner',
                    content: lessonContent,
                    _langName: lang.languageName,
                    _code: code,
                    _words: topic.words
                });
            }
        }

        const insertedExtraLessons = await Lesson.insertMany(dynamicallyCreatedLessons.map(l => ({
            title: l.title,
            description: l.description,
            languageId: l.languageId,
            difficulty: l.difficulty,
            content: l.content
        })));

        let extraQuizzesArray = [];
        insertedExtraLessons.forEach((insertedLesson, index) => {
            const metaLesson = dynamicallyCreatedLessons[index];
            const metaWords = metaLesson._words;
            const langName = metaLesson._langName;
            const code = metaLesson._code;
            
            metaWords.forEach((item, itemIndex) => {
                const isEnglishTarget = langName === 'English';
                const targetWord = isEnglishTarget ? item['en'] : item[code];
                const engWord = item['en'];
                
                const getWrongOpts = (isTarget) => {
                    let opts = metaWords.filter((_, i) => i !== itemIndex).map(w => isTarget ? (isEnglishTarget ? w['en'] : w[code]) : w['en']);
                    return opts.sort(() => 0.5 - Math.random()).slice(0, 3);
                };

                let options, question;
                if (itemIndex % 2 === 0) {
                    const wrongOpts = getWrongOpts(true);
                    options = [...new Set([targetWord, ...wrongOpts])];
                    question = `What is the ${langName} word for "${engWord}"?`;
                } else {
                    const wrongOpts = getWrongOpts(false);
                    options = [...new Set([engWord, ...wrongOpts])];
                    question = `Translate "${targetWord}" to English.`;
                    if (isEnglishTarget) {
                        question = `What is the synonym or translation for "${targetWord}"?`;
                    }
                }
                
                while (options.length < 4) {
                    let fallback = 'Option ' + Math.floor(Math.random() * 1000);
                    if (!options.includes(fallback)) options.push(fallback);
                }
                
                options.sort(() => 0.5 - Math.random());
                
                extraQuizzesArray.push({
                    lessonId: insertedLesson._id,
                    question,
                    options: options.slice(0, 4),
                    correctAnswer: itemIndex % 2 === 0 ? targetWord : engWord
                });
            });
        });

        await Quiz.insertMany(extraQuizzesArray);

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
