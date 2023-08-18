import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { databaseRef } from "../firebase";
import { Quiz } from "./Quiz"

/**
 * Loads the full list of quizzes.
 * @returns Promise<Quiz[]> containing a full list of quizzes.
 */
export const loadAllQuizzes = async (): Promise<Quiz[]> => {
    const quizCollection = collection(databaseRef, 'quizzes');
    const quizSnapshot = await getDocs(quizCollection);
    const quizList = quizSnapshot.docs.map(quiz => quiz.data() as Quiz);
    return quizList;
}

/**
 * Loading single quiz by their slug.
 * TODO: Should this take the title, and convert it to a slug inside the function?
 * @param slug: string 
 * @returns Promise<Quiz>
 */
export const loadQuiz = async (slug: string): Promise<Quiz> => {
    const quizDocRef = doc(databaseRef, `quizzes/${slug}`);
    const selectedQuiz = await getDoc(quizDocRef);
    if (selectedQuiz != null) {
        return Promise.resolve(selectedQuiz?.data() as Quiz);
    } else {
        throw new Error(`Failed to load quiz ${slug}`);
    }
}
/**
 * Saves a quiz to the Firebase store.
 * @param newQuiz 
 */
export const saveQuiz = async (newQuiz: Quiz) => {
    const quizDocRef = doc(databaseRef, `quizzes/${newQuiz.slug}`);
    await setDoc(quizDocRef, newQuiz);
}

//TODO: Actually use this for a leaderboard, and with whatever storage system we use
export const saveScore = (user: string, score: number) => {
    localStorage.setItem(user, score.toString());
}