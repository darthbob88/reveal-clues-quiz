import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { QuestionComponent } from "./Question";
import { defaultQuiz, QuizEnum, QuizState, QuizStateContext } from "../../model/Quiz";
import {
  QuestionEnum,
  defaultQuestionState,
  QuestionState,
} from "../../model/Question";

const defaultQuestion = defaultQuiz.questions[0];
const awardPoints = (score: number) => {
  console.log(score);
};
let startedQuizState = new QuizState(defaultQuiz);
beforeEach(() => {
  startedQuizState = new QuizState(defaultQuiz);
  startedQuizState.quizStatus = QuizEnum.IN_PROGRESS;
})
describe("Question component", () => {
  test("renders a question properly", () => {
    const { container, getByText, getAllByText } = render(
      <QuestionComponent
        state={defaultQuestionState}
        question={defaultQuestion}
        awardPoints={awardPoints}
        prompt={defaultQuiz.prompt}
      />
    );
    const firstClue = getByText(defaultQuestion.clues[0]);
    expect(firstClue).toBeInTheDocument();
    const unrevealedClues = getAllByText("-----------");
    expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 1);

    const revealClue = getByText("Reveal Another Clue");
    expect(revealClue).toBeEnabled();

    expect(container).toMatchSnapshot();
  });

  test("renders a correctly answered question properly", () => {
    const modifiedState = { ...defaultQuestionState, state: QuestionEnum.CORRECTLY_ANSWERED };
    const { container, getByText, getAllByText } = render(
      <QuestionComponent
        state={modifiedState}
        question={defaultQuestion}
        awardPoints={awardPoints}
        prompt={defaultQuiz.prompt}
      />
    );
    const firstClue = getByText(defaultQuestion.clues[0]);
    expect(firstClue).toBeInTheDocument();
    const unrevealedClues = getAllByText("-----------");
    expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 1);

    const revealClue = getByText("Reveal Another Clue");
    expect(revealClue).toBeDisabled();

    // TODO: How can I check that it's awarding the correct number of points?
    const correctAnswer = getByText(/Correct/i);
    expect(correctAnswer).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test("renders an incorrectly answered question properly", () => {
    const modifiedState = { ...defaultQuestionState, state: QuestionEnum.INCORRECTLY_ANSWERED };
    const { container, getByText, getAllByText } = render(
      <QuestionComponent
        state={modifiedState}
        question={defaultQuestion}
        awardPoints={awardPoints}
        prompt={defaultQuiz.prompt}
      />
    );
    const firstClue = getByText(defaultQuestion.clues[0]);
    expect(firstClue).toBeInTheDocument();
    const unrevealedClues = getAllByText("-----------");
    expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 1);

    const revealClue = getByText("Reveal Another Clue");
    expect(revealClue).toBeDisabled();

    const incorrectAnswer = getByText(/Incorrect/i);
    expect(incorrectAnswer).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  // Can't easily test this after moving `revealedClues` to MobX :(
  test("reveals more clues as necessary", () => {
    const defaultQuestion = startedQuizState.currentQuiz.questions[0];
    const defaultQuestionState = startedQuizState.quizState[0];

    const { queryByText, getByText, getAllByText } = render(
      <QuizStateContext.Provider value={startedQuizState}>
        <QuestionComponent
          state={defaultQuestionState}
          question={defaultQuestion}
          awardPoints={awardPoints}
        />
      </QuizStateContext.Provider>
    );
    const revealClue = getByText("Reveal Another Clue");
    expect(revealClue).toBeEnabled();

    // Should only show one clue at first
    const firstClue = getByText(defaultQuestion.clues[0]);
    expect(firstClue).toBeInTheDocument();
    let unrevealedClues = getAllByText("-----------");
    expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 1);

    // Should reveal a second clue
    fireEvent.click(revealClue);
    const secondClue = getByText(defaultQuestion.clues[1]);
    expect(secondClue).toBeInTheDocument();
    unrevealedClues = getAllByText("-----------");
    expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 2);

    // Should reveal a third clue
    fireEvent.click(revealClue);
    const thirdClue = getByText(defaultQuestion.clues[2]);
    expect(thirdClue).toBeInTheDocument();
    unrevealedClues = getAllByText("-----------");
    expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 3);

    // Should reveal all four clues
    fireEvent.click(revealClue);
    const fourthClue = getByText(defaultQuestion.clues[3]);
    expect(fourthClue).toBeInTheDocument();
    expect(queryByText("-----------")).not.toBeInTheDocument();

    // After we reveal all four clues, the "Reveal Clue" button should be disabled
    expect(revealClue).toBeDisabled();
  });

  test("awards 4 points for correct answer with 1 clue", () => {
    const incrementScore = jest.fn();
    const { getByText, getByLabelText } = render(
      <QuestionComponent
        state={defaultQuestionState}
        question={defaultQuestion}
        awardPoints={incrementScore}
        prompt={defaultQuiz.prompt}
      />
    );
    const answerSlot = getByLabelText(/Answer/i);
    fireEvent.change(answerSlot, { target: { value: defaultQuestion.answer } });

    const submitBtn = getByText(/Submit/i);
    fireEvent.click(submitBtn);

    const expectedState: QuestionState = {
      state: QuestionEnum.CORRECTLY_ANSWERED,
      score: defaultQuestion.clues.length,
      revealedClues: 0,
    };
    expect(incrementScore).toHaveBeenCalledTimes(1);
    expect(incrementScore).toHaveBeenCalledWith(expectedState);
  });

  test("awards 3 points for correct answer with 2 clues", () => {
    const defaultQuestionState = startedQuizState.quizState[0];
    const incrementScore = jest.fn();
    const { getByText, getByLabelText } = render(
      <QuizStateContext.Provider value={startedQuizState}>
        <QuestionComponent
          state={defaultQuestionState}
          question={defaultQuestion}
          awardPoints={incrementScore}
          prompt={defaultQuiz.prompt}
        />
      </QuizStateContext.Provider>
    );

    const revealClue = getByText("Reveal Another Clue");
    expect(revealClue).toBeEnabled();
    fireEvent.click(revealClue);

    const answerSlot = getByLabelText(/Answer/i);
    fireEvent.change(answerSlot, { target: { value: defaultQuestion.answer } });

    const submitBtn = getByText(/Submit/i);
    fireEvent.click(submitBtn);

    const expectedState: QuestionState = {
      state: QuestionEnum.CORRECTLY_ANSWERED,
      score: defaultQuestion.clues.length - 1,
      revealedClues: 1,
    };
    expect(incrementScore).toHaveBeenCalledTimes(1);
    expect(incrementScore).toHaveBeenCalledWith(expectedState);
  });

  test("awards 0 points for incorrect answer", () => {
    const incrementScore = jest.fn();
    const defaultQuestionState = startedQuizState.quizState[0];
    const { getByText, getByLabelText } = render(
      <QuestionComponent
        state={defaultQuestionState}
        question={defaultQuestion}
        awardPoints={incrementScore}
        prompt={defaultQuiz.prompt}
      />
    );

    const answerSlot = getByLabelText(/Answer/i);
    fireEvent.change(answerSlot, { target: { value: "butts" } });

    const submitBtn = getByText(/Submit/i);
    fireEvent.click(submitBtn);

    const expectedState: QuestionState = {
      state: QuestionEnum.INCORRECTLY_ANSWERED,
      score: 0,
      revealedClues: 0,
    };
    expect(incrementScore).toHaveBeenCalledTimes(1);
    expect(incrementScore).toHaveBeenCalledWith(expectedState);
  });
})