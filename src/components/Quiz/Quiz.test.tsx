import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { QuizComponent } from "./QuizComponent";
import { defaultQuiz, QuizState } from "../../model/Quiz";

const firstQuestion = defaultQuiz.questions[0];

const defaultQuizState = new QuizState(defaultQuiz);
test("renders a quiz properly", () => {
  const { getByText, getAllByText } = render(
    <QuizComponent quiz={defaultQuizState} />
  );
  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();
  const unrevealedClues = getAllByText("-----------");
  expect(unrevealedClues.length).toBe(firstQuestion.clues.length - 1);

  const revealClue = getByText("Reveal Another Clue");
  expect(revealClue).toBeEnabled();
});

test("shows next unanswered question when one is answered", async () => {
  const { getByText, getByLabelText, queryByText } = render(
    <QuizComponent quiz={defaultQuizState} />
  );
  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const answerSlot = getByLabelText(/Answer/i);
  fireEvent.change(answerSlot, { target: { value: firstQuestion.answer } });

  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  const result = queryByText(/Correct!/i);
  expect(result).toBeInTheDocument();

  const secondQuestion = defaultQuiz.questions[1];
  const secondClue = await waitForElement(() =>
    getByText(secondQuestion.clues[0])
  );
  expect(secondClue).toBeInTheDocument();
});

test("cycles to next question", () => {
  const { getByText } = render(<QuizComponent quiz={defaultQuizState} />);

  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const nextQuestion = getByText(/next/i);
  expect(nextQuestion).toBeEnabled();
  fireEvent.click(nextQuestion);

  const secondQuestion = defaultQuiz.questions[1];
  const secondClue = getByText(secondQuestion.clues[0]);
  expect(secondClue).toBeInTheDocument();
  fireEvent.click(nextQuestion);

  const thirdQuestion = defaultQuiz.questions[2];
  const thirdClue = getByText(thirdQuestion.clues[0]);
  expect(thirdClue).toBeInTheDocument();
});

test("cycles to prev question", () => {
  const { getByText } = render(<QuizComponent quiz={defaultQuizState} />);

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

xtest("cycles to next unanswered question", async () => {
  const { getByText, getByLabelText, queryByText } = render(
    <QuizComponent quiz={defaultQuizState} />
  );
  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const answerSlot = getByLabelText(/Answer/i);
  fireEvent.change(answerSlot, { target: { value: firstQuestion.answer } });

  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  const result = queryByText(/Correct!/i);
  expect(result).toBeInTheDocument();

  const secondQuestion = defaultQuiz.questions[1];
  const secondClue = await waitForElement(() =>
    getByText(secondQuestion.clues[0])
  );
  expect(secondClue).toBeInTheDocument();
});
