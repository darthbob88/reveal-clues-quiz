import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { QuestionComponent } from "./Question";
import { defaultQuiz } from "../../model/Quiz";

const defaultQuestion = defaultQuiz.questions[0];

test("renders a question properly", () => {
  const { getByText, getAllByText } = render(
    <QuestionComponent question={defaultQuestion} />
  );
  const firstClue = getByText(defaultQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();
  const unrevealedClues = getAllByText("-----------");
  expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 1);

  const revealClue = getByText("Reveal Another Clue");
  expect(revealClue).toBeEnabled();
});

test("reveals more clues as necessary", () => {
  const { queryByText, getByText, getAllByText } = render(
    <QuestionComponent question={defaultQuestion} />
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

test("awards the right number of points", () => {
  const { getByText, getAllByText } = render(
    <QuestionComponent question={defaultQuestion} />
  );
  const firstClue = getByText(defaultQuestion.clues[0]);
  expect(firstClue).toBeInTheDocument();
  const unrevealedClues = getAllByText("-----------");
  expect(unrevealedClues.length).toBe(defaultQuestion.clues.length - 1);

  const revealClue = getByText("Reveal Another Clue");
  expect(revealClue).toBeEnabled();
});
