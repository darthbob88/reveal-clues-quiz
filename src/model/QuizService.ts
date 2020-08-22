import { Quiz, defaultQuiz } from "./Quiz"
/**
 * Service for loading quizzes from whatever DB I decide to use.
 * Should probably make it parameterized, so I can select which quiz
 * to load, but that would mean handling saving quizzes, so.
 */
export const loadQuiz = () => {
    return defaultQuiz;
}

export const saveScore = (user: string, score: number) => {
    localStorage.setItem(user, score.toString());
}