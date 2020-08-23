import React from "react";
import {
  render,
  fireEvent,
  getByLabelText,
  queryByText,
} from "@testing-library/react";
import { QuestionComponent } from "./Question";
import { defaultQuiz } from "../../model/Quiz";

const defaultQuestion = defaultQuiz.questions[0];
const awardPoints = (score: number) => {
  console.log(score);
};
test("renders a question properly", () => {
  const { getByText, getAllByText } = render(
    <QuestionComponent question={defaultQuestion} awardPoints={awardPoints} />
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
    <QuestionComponent question={defaultQuestion} awardPoints={awardPoints} />
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
  const { getByText, getAllByText, getByLabelText, queryByText } = render(
    <QuestionComponent
      question={defaultQuestion}
      awardPoints={incrementScore}
    />
  );
  const answerSlot = getByLabelText(/Answer/i);
  fireEvent.change(answerSlot, { target: { value: defaultQuestion.answer } });

  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  const result = queryByText(/Correct/i);
  expect(result).toBeInTheDocument();
  expect(incrementScore).toHaveBeenCalledTimes(1);
  expect(incrementScore).toHaveBeenCalledWith(defaultQuestion.clues.length);
});

test("awards 3 points for correct answer with 2 clues", () => {
  const incrementScore = jest.fn();
  const { getByText, getAllByText, getByLabelText, queryByText } = render(
    <QuestionComponent
      question={defaultQuestion}
      awardPoints={incrementScore}
    />
  );

  const revealClue = getByText("Reveal Another Clue");
  expect(revealClue).toBeEnabled();
  fireEvent.click(revealClue);

  const answerSlot = getByLabelText(/Answer/i);
  fireEvent.change(answerSlot, { target: { value: defaultQuestion.answer } });

  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  const result = queryByText(/Correct/i);
  expect(result).toBeInTheDocument();
  expect(incrementScore).toHaveBeenCalledTimes(1);
  expect(incrementScore).toHaveBeenCalledWith(defaultQuestion.clues.length - 1);
});

test("awards 0 points for incorrect answer", () => {
  const incrementScore = jest.fn();
  const { getByText, getAllByText, getByLabelText, queryByText } = render(
    <QuestionComponent
      question={defaultQuestion}
      awardPoints={incrementScore}
    />
  );
  const answerSlot = getByLabelText(/Answer/i);
  fireEvent.change(answerSlot, { target: { value: "butts" } });

  const submitBtn = getByText(/Submit/i);
  fireEvent.click(submitBtn);

  const result = queryByText(/Correct/i);
  expect(result).toBeInTheDocument();
  expect(incrementScore).toHaveBeenCalledTimes(1);
  expect(incrementScore).toHaveBeenCalledWith(0);
});
