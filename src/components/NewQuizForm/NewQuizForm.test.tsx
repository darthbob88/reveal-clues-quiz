import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { NewQuizForm } from "./NewQuizForm";
import { testQuizzes } from "../../model/Quiz";
import userEvent from "@testing-library/user-event/";
import * as QuizService from "../../model/QuizService";

describe("New Quiz component", () => {
  test("renders the new quiz form properly", () => {
    const { container } = render(
      <NewQuizForm />
    );

    expect(container).toMatchSnapshot();
  });
  describe("Properly handles adding/removing clues/questions", () => {
    test("adds a new question when the button is clicked", () => {
      const { getByText, queryByText } = render(
        <NewQuizForm />
      );

      let result = queryByText(/Question 2/i);
      expect(result).not.toBeInTheDocument();

      const addQBtn = getByText(/Add Question/i);
      fireEvent.click(addQBtn);

      result = queryByText(/Question 2/i);
      expect(result).toBeInTheDocument();
    });

    test("removes a clue from a question when the button is clicked", () => {
      const { getByTestId } = render(
        <NewQuizForm />
      );

      const question = getByTestId("question1");
      expect(question).toBeInTheDocument();

      const clue1 = within(question).queryByTestId("clue1");
      expect(clue1).toBeInTheDocument();

      let clue4 = within(question).queryByTestId("clue4");
      expect(clue4).toBeInTheDocument();

      const removeClueQBtn = within(question).getAllByTestId("remove-clue");
      expect(removeClueQBtn).toHaveLength(4);
      fireEvent.click(removeClueQBtn[0]);

      clue4 = within(question).queryByTestId("clue4");
      expect(clue4).not.toBeInTheDocument();
    });

    test("removes a question when the button is clicked", () => {
      const { getByText, getByTestId, queryByTestId } = render(
        <NewQuizForm />
      );

      const addQBtn = getByText(/Add Question/i);
      fireEvent.click(addQBtn);

      const question = getByTestId("question2");
      expect(question).toBeInTheDocument();

      const removeQBtn = within(question).getByTestId("remove-question");
      fireEvent.click(removeQBtn);

      const question2 = queryByTestId("question2");
      expect(question2).not.toBeInTheDocument();
    });

    test("adds a clue to a question when the button is clicked", () => {
      const { getByTestId } = render(
        <NewQuizForm />
      );

      const question = getByTestId("question1");
      expect(question).toBeInTheDocument();

      const clue1 = within(question).queryByTestId("clue1");
      expect(clue1).toBeInTheDocument();

      let clue5 = within(question).queryByTestId("clue5");
      expect(clue5).not.toBeInTheDocument();

      const addClueQBtn = within(question).getByTestId("add-clue");
      fireEvent.click(addClueQBtn);

      clue5 = within(question).queryByTestId("clue5");
      expect(clue5).toBeInTheDocument();
    });
  });

  describe("Properly handles input", () => {
    test("Can handle inputting the title", async () => {
      const user = userEvent.setup();
      const testQuiz = testQuizzes[0];
      const { getByLabelText } = render(
        <NewQuizForm />
      );

      const quizTitle = getByLabelText("Quiz Title");
      await user.type(quizTitle, testQuiz.title);
      expect(quizTitle).toHaveValue(testQuiz.title);
    });

    test("Can handle inputting a prompt", async () => {
      const user = userEvent.setup();
      const testQuiz = testQuizzes[0];
      const { getByLabelText } = render(
        <NewQuizForm />
      );

      const quizPrompt = getByLabelText("Quiz Prompt");
      await user.type(quizPrompt, testQuiz.prompt);
      expect(quizPrompt).toHaveValue(testQuiz.prompt);
    });

    test("Can handle inputting clues for a question", async () => {
      const user = userEvent.setup();
      const testQuiz = testQuizzes[0];
      const clues = testQuiz.questions[0].clues;
      const { getAllByTestId } = render(
        <NewQuizForm />
      );

      const cluePrompts = getAllByTestId(/clue\d/);
      for (let ii = 0; ii < cluePrompts.length; ii++) {
        const cluePrompt = cluePrompts[ii];
        const clue = clues[ii];
        await user.type(cluePrompt, clue);
        expect(cluePrompt).toHaveValue(clue);
      }
    });

    test("Can handle inputting answer for a question", async () => {
      const testQuiz = testQuizzes[0];
      const testAnswer = testQuiz.questions[0].answer;
      const { getByLabelText } = render(
        <NewQuizForm />
      );

      const answerInput = getByLabelText("Answer");
      await userEvent.type(answerInput, testAnswer);
      expect(answerInput).toHaveValue(testAnswer);

    });
  })

  describe("Properly handles submitting a quiz", () => {
    // Input a test quiz and make sure it gets submitted correctly.
    test("Can handle submitting a good quiz", async () => {
      const saveNewQuizSpy = jest.spyOn(QuizService, "saveNewQuiz");

      const user = userEvent.setup();
      const testQuiz = testQuizzes[0];
      testQuiz.questions = [{ ...testQuiz.questions[0], revealOnAnswer: "butts" }];
      const { getByLabelText, getAllByTestId, getByText } = render(
        <NewQuizForm />
      );

      const quizTitle = getByLabelText("Quiz Title");
      await user.type(quizTitle, testQuiz.title);
      expect(quizTitle).toHaveValue(testQuiz.title);

      const quizPrompt = getByLabelText("Quiz Prompt");
      await userEvent.type(quizPrompt, testQuiz.prompt);
      expect(quizPrompt).toHaveValue(testQuiz.prompt);

      const timePrompt = getByLabelText("Time Limit (in minutes)");
      const timeInMinutes = testQuiz.time/60;
      await userEvent.type(timePrompt, `${timeInMinutes}`);
      expect(timePrompt).toHaveValue(timeInMinutes);

      const cluePrompts = getAllByTestId(/clue\d/);
      for (let ii = 0; ii < cluePrompts.length; ii++) {
        const cluePrompt = cluePrompts[ii];
        const clue = testQuiz.questions[0].clues[ii];
        await user.type(cluePrompt, clue);
        expect(cluePrompt).toHaveValue(clue);
      }

      const testReveal = "butts";
      const revealInput = getByLabelText("Additional text");
      await userEvent.type(revealInput, testReveal);
      expect(revealInput).toHaveValue(testReveal);

      const testAnswer = testQuiz.questions[0].answer;
      const answerInput = getByLabelText("Answer");
      await userEvent.type(answerInput, testAnswer);
      expect(answerInput).toHaveValue(testAnswer);

      const submitBtn = getByText("Submit New Quiz");
      fireEvent.click(submitBtn);

      expect(saveNewQuizSpy).toBeCalledTimes(1);
      expect(saveNewQuizSpy).toBeCalledWith(testQuiz);

    });
  });
});