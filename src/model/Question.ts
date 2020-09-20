export type Question = {
    clues: string[];
    answer: string;
    revealOnAnswer?: string;
}
export enum QuestionEnum {
    UNANSWERED,
    CORRECTLY_ANSWERED,
    INCORRECTLY_ANSWERED
}
export type QuestionState = {
    state: QuestionEnum;
    score: number;
    revealedClues: number;
}
