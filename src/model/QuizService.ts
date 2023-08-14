import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { databaseRef } from "../firebase";
import { Quiz } from "./Quiz"
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

/** Loading single quiz by their slug.
 * TODO: Should this take the title, and convert it to a slug inside the function?
 */
export const loadQuiz = async (slug: string) => {
    const quizDocRef = doc(databaseRef, `quizzes/${slug}`);
    const selectedQuiz = await getDoc(quizDocRef);
    if (selectedQuiz != null) {
        return Promise.resolve(selectedQuiz?.data() as Quiz);
    } else {
        throw new Error(`Failed to load quiz ${slug}`);
    }
}

export const saveQuiz = async (newQuiz: Quiz) => {
    const quizDocRef = doc(databaseRef, `quizzes/${newQuiz.slug}`);
    await setDoc(quizDocRef, newQuiz);
}

export const saveScore = (user: string, score: number) => {
    localStorage.setItem(user, score.toString());
}