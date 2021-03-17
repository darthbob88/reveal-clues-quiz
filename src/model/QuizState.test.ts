import { QuestionEnum } from "./Question";
import { defaultQuiz, QuizState } from "./Quiz"

// This test kinda taken from https://semaphoreci.com/community/tutorials/how-to-test-react-and-mobx-with-jest
describe("Quiz State", () => {
    test("Scores questions properly", () => {
        const testStore = new QuizState(defaultQuiz);
        expect(testStore.scorePoints).toBe(0);
        expect(testStore.scorePercent).toBe(0);

        //TODO: I really should reduce this down to just numClues and state, and derive score.
        testStore.scoreQuestion(0, { score: 4, revealedClues: 0, state: QuestionEnum.CORRECTLY_ANSWERED });
        expect(testStore.scorePoints).toBe(4);
        expect(testStore.scorePercent).toBe(1);

        testStore.scoreQuestion(1, { score: 3, revealedClues: 1, state: QuestionEnum.CORRECTLY_ANSWERED });
        expect(testStore.scorePoints).toBe(7);
        expect(testStore.scorePercent).toBe(2);
    })

    test("Properly handles incorrectly answered questions", () => {
        const testStore = new QuizState(defaultQuiz);
        expect(testStore.scorePoints).toBe(0);
        expect(testStore.scorePercent).toBe(0);

        // TODO: This should be a percentage or smth
        testStore.scoreQuestion(0, { score: 0, revealedClues: 0, state: QuestionEnum.INCORRECTLY_ANSWERED });
        expect(testStore.scorePoints).toBe(0);
        expect(testStore.scorePercent).toBe(0);
    })
})