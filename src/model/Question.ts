export type Question = {
    clues: string[];
    answer: string;
    revealOnAnswer?: string;
}
export enum QuestionState {
    UNANSWERED,
    CORRECTLY_ANSWERED,
    INCORRECTLY_ANSWERED
}