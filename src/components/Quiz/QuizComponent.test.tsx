import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import { QuizComponent } from "./QuizComponent";
import { defaultQuiz, QuizEnum, QuizState, QuizStateContext } from "../../model/Quiz";
import { QuestionEnum } from "../../model/Question";

const firstQuestion = defaultQuiz.questions[0];

const defaultQuizState = new QuizState(defaultQuiz);

const startedQuizState = new QuizState(defaultQuiz);
startedQuizState.quizStatus = QuizEnum.IN_PROGRESS;

test("renders a quiz properly", () => {
  const { getByText, container } = render(
    <QuizStateContext.Provider value={defaultQuizState}>
      <QuizComponent /></QuizStateContext.Provider>
  );

  const startQuizBtn = getByText("Start Quiz");
  expect(startQuizBtn).toBeEnabled();

  expect(container).toMatchSnapshot();
});

test("renders a started quiz properly", () => {
  const { getByText, getAllByText, container } = render(
    <QuizStateContext.Provider value={startedQuizState}>
      <QuizComponent /></QuizStateContext.Provider>
  );
  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();
  const unrevealedClues = getAllByText("-----------");
  expect(unrevealedClues.length).toBe(firstQuestion.clues.length - 1);

  const revealClue = getByText("Reveal Another Clue");
  expect(revealClue).toBeEnabled();

  expect(container).toMatchSnapshot();
});

xtest("shows next unanswered question when one is answered", async () => {
  const { getByText, getByLabelText, queryByText } = render(
    <QuizStateContext.Provider value={startedQuizState}>
      <QuizComponent /></QuizStateContext.Provider>
  );
  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const answerSlot = getByLabelText(/Answer/i);
  fireEvent.change(answerSlot, { target: { value: firstQuestion.answer } });

  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  const result = queryByText(/Correct!/i);
  expect(result).toBeInTheDocument();

  const secondQuestion = defaultQuiz.questions[1].clues[0];
  console.log(secondQuestion)
  await waitForElementToBeRemoved(() => getByText(firstQuestion.clues[0]));
  const secondClue = getByText(secondQuestion);
  expect(secondClue).toBeInTheDocument();
});

test("cycles to next question", () => {
  const { getByText } = render(<QuizStateContext.Provider value={startedQuizState}>
    <QuizComponent /></QuizStateContext.Provider>);

  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const nextQuestion = getByText(/next/i);
  expect(nextQuestion).toBeEnabled();
  fireEvent.click(nextQuestion);

  const secondQuestion = defaultQuiz.questions[1];
  const secondClue = getByText(secondQuestion.clues[0]);
  expect(secondClue).toBeInTheDocument();
  expect(nextQuestion).toBeEnabled();
  fireEvent.click(nextQuestion);

  const thirdQuestion = defaultQuiz.questions[2];
  const thirdClue = getByText(thirdQuestion.clues[0]);
  expect(thirdClue).toBeInTheDocument();
});

test("cycles to prev question", () => {
  const { getByText } = render(<QuizStateContext.Provider value={startedQuizState}>
    <QuizComponent /></QuizStateContext.Provider>);

  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const prevQuestion = getByText(/Prev/i);
  expect(prevQuestion).toBeEnabled();
  fireEvent.click(prevQuestion);

  const secondQuestion =
    defaultQuiz.questions[defaultQuiz.questions.length - 1];
  const secondClue = getByText(secondQuestion.clues[0]);
  expect(secondClue).toBeInTheDocument();
});

test("cycles to prev unanswered question", async () => {
  const modifiedState = startedQuizState;
  modifiedState.quizState[defaultQuiz.questions.length - 1] = {
    state: QuestionEnum.CORRECTLY_ANSWERED,
    score: 0,
    revealedClues: 0,
  };
  const { getByText } = render(<QuizStateContext.Provider value={modifiedState}>
    <QuizComponent /></QuizStateContext.Provider>);

  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const prevQuestion = getByText(/Prev/i);
  expect(prevQuestion).toBeEnabled();
  fireEvent.click(prevQuestion);

  const secondQuestion =
    defaultQuiz.questions[defaultQuiz.questions.length - 2];
  const secondClue = getByText(secondQuestion.clues[0]);
  expect(secondClue).toBeInTheDocument();
});
