import { Quiz, defaultQuiz, testQuizzes } from "./Quiz"
/**
 * Service for loading quizzes from whatever DB I decide to use.
 * Should probably make it parameterized, so I can select which quiz
 * to load, but that would mean handling saving quizzes, so.
 */

export const loadAllQuizzes = async (): Promise<Quiz[]> => {
    return Promise.resolve(testQuizzes);
}

export const loadQuiz = (slug: string) => {
    const selectedQuiz = testQuizzes.find(item => item.slug === slug) || defaultQuiz;
    return Promise.resolve(selectedQuiz);
}

export const saveScore = (user: string, score: number) => {
    localStorage.setItem(user, score.toString());
}