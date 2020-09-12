import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { QuizComponent } from "./QuizComponent";
import { defaultQuiz } from "../../model/Quiz";

const firstQuestion = defaultQuiz.questions[0];
const awardPoints = (score: number) => {
  console.log(score);
};
test("renders a quiz properly", () => {
  const { getByText, getAllByText } = render(
    <QuizComponent quiz={defaultQuiz} awardPoints={awardPoints} />
  );
  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();
  const unrevealedClues = getAllByText("-----------");
  expect(unrevealedClues.length).toBe(firstQuestion.clues.length - 1);

  const revealClue = getByText("Reveal Another Clue");
  expect(revealClue).toBeEnabled();
});

xtest("shows next unanswered question when one is answered", () => {
  const { getByText, getAllByText, getByLabelText, queryByText } = render(
    <QuizComponent quiz={defaultQuiz} awardPoints={awardPoints} />
  );
  const firstClue = getByText(firstQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();

  const answerSlot = getByLabelText(/Answer/i);
  fireEvent.change(answerSlot, { target: { value: firstQuestion.answer } });

  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  const result = queryByText(/Correct/i);
  expect(result).toBeInTheDocument();

  const secondQuestion = defaultQuiz.questions[1];
  const secondClue = getByText(secondQuestion.clues[0]);
  expect(secondClue).toBeInTheDocument();
});

test("cycles to next question", () => {
  const incrementScore = jest.fn();
  const { getByText } = render(
    <QuizComponent quiz={defaultQuiz} awardPoints={incrementScore} />
  );

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
  const incrementScore = jest.fn();
  const { getByText } = render(
    <QuizComponent quiz={defaultQuiz} awardPoints={incrementScore} />
  );

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
