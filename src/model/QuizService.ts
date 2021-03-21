import { Quiz, defaultQuiz, testQuizzes } from "./Quiz"
/**
 * Service for loading quizzes from whatever DB I decide to use.
 */

export const loadAllQuizzes = async (): Promise<Quiz[]> => {
    return Promise.resolve(testQuizzes);
}

export const loadQuiz = (slug: string) => {
    const selectedQuiz = testQuizzes.find(item => item.slug === slug) || defaultQuiz;
    return Promise.resolve(selectedQuiz);
}

//TODO: Actually use this.
export const saveScore = (user: string, score: number) => {
    localStorage.setItem(user, score.toString());
}

export const saveNewQuiz = (newQuiz: Quiz) => {
    testQuizzes.push(newQuiz);
}