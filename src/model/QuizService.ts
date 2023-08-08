import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { databaseRef } from "../firebase";
import { Quiz, defaultQuiz, testQuizzes } from "./Quiz"
/**
 * Service for loading quizzes from whatever DB I decide to use.
 * Should probably make it parameterized, so I can select which quiz
 * to load, but that would mean handling saving quizzes, so.
 */

export const loadAllQuizzes = async (): Promise<Quiz[]> => {
    const quizCollection = collection(databaseRef, 'quizzes');
    const quizSnapshot = await getDocs(quizCollection);
    const quizList = quizSnapshot.docs.map(quiz => quiz.data() as Quiz);
    return quizList;
}

export const loadQuiz = (slug: string) => {
    const selectedQuiz = testQuizzes.find(item => item.slug === slug) || defaultQuiz;
    return Promise.resolve(selectedQuiz);
}

export const saveQuiz = async (newQuiz: Quiz) => {
    const quizDocRef = doc(databaseRef, `quizzes/${newQuiz.slug}`);
    const document = await setDoc(quizDocRef, newQuiz);
    console.log(document);
}

export const saveScore = (user: string, score: number) => {
    localStorage.setItem(user, score.toString());
}