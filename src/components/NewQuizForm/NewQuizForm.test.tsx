import React from "react";
import { Matcher, SelectorMatcherOptions, fireEvent, render, within } from "@testing-library/react";
import { NewQuizForm } from "./NewQuizForm";
import { testQuizzes } from "../../model/Quiz";
import userEvent from "@testing-library/user-event/";
import * as QuizService from "../../model/QuizService";
import { MemoryRouter } from "react-router-dom";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { Question } from "../../model/Question";

describe("New Quiz component", () => {
  test("renders the new quiz form properly", () => {
    const { container } = render(
      <MemoryRouter>   <NewQuizForm />
      </MemoryRouter>);

    expect(container).toMatchSnapshot();
  });

  describe("Properly handles adding/removing clues/questions", () => {
    test("adds a new question when the button is clicked", () => {
      const { getByText, queryByText } = render(
        <MemoryRouter>
          <NewQuizForm />
        </MemoryRouter>);

      let result = queryByText(/Question 2/i);
      expect(result).not.toBeInTheDocument();

      const addQBtn = getByText(/Add Question/i);
      fireEvent.click(addQBtn);

      result = queryByText(/Question 2/i);
      expect(result).toBeInTheDocument();
    });

    test("Can only add up to 10 questions", () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter>
          <NewQuizForm /></MemoryRouter>);

      const addQBtn = getByText(/Add Question/i);
      for (let ii = 0; ii < 10; ii++) {
        fireEvent.click(addQBtn);
        expect(getByTestId(`question${ii + 1}`)).toBeInTheDocument();
      }
      expect(addQBtn).toBeDisabled();
    });

    test("removes a question when the button is clicked", () => {
      const { getByText, getByTestId, queryByTestId } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>
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

    test("Cannot remove question if only 1 left", () => {
      const { getByTestId } = render(<MemoryRouter>   <NewQuizForm /></MemoryRouter>
      );

      const question = getByTestId("question1");
      expect(question).toBeInTheDocument();

      const removeQBtn = within(question).getByTestId("remove-question");
      expect(removeQBtn).toBeDisabled();
    });

    test("adds a clue to a question when the button is clicked", () => {
      const { getByTestId } = render(<MemoryRouter>   <NewQuizForm /></MemoryRouter>
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

    test("Can only add up to 10 clues", () => {
      const { getByTestId } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>);

      const question = getByTestId("question1");
      expect(question).toBeInTheDocument();

      const addClueQBtn = within(question).getByTestId("add-clue");

      for (let ii = 4; ii < 10; ii++) {
        fireEvent.click(addClueQBtn);
        expect(getByTestId(`clue${ii + 1}`)).toBeInTheDocument();
      }
      expect(addClueQBtn).toBeDisabled();
    });

    test("removes a clue from a question when the button is clicked", () => {
      const { getByTestId } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>);

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

    test("Cannot remove clue if only 1 left", () => {
      const { getByTestId } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>);

      const question = getByTestId("question1");
      expect(question).toBeInTheDocument();

      let removeClueQBtns = within(question).getAllByTestId("remove-clue");
      for (let ii = removeClueQBtns.length - 1; ii > 0; ii--) {
        fireEvent.click(removeClueQBtns[ii]);
      }

      removeClueQBtns = within(question).getAllByTestId("remove-clue");
      expect(removeClueQBtns).toHaveLength(1);
      expect(removeClueQBtns[0]).toBeDisabled();
    });

  });

  describe("Properly handles input", () => {
    test("Can handle inputting the title", async () => {
      const user = userEvent.setup();
      const testQuiz = testQuizzes[0];
      const { getByLabelText } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>);

      const quizTitle = getByLabelText("Quiz Title");
      await user.type(quizTitle, testQuiz.title);
      expect(quizTitle).toHaveValue(testQuiz.title);
    });

    test("Can handle inputting a prompt", async () => {
      const user = userEvent.setup();
      const testQuiz = testQuizzes[0];
      const { getByLabelText } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>);

      const quizPrompt = getByLabelText("Quiz Prompt");
      await user.type(quizPrompt, testQuiz.prompt);
      expect(quizPrompt).toHaveValue(testQuiz.prompt);
    });

    test("Can handle inputting clues for a question", async () => {
      const user = userEvent.setup();
      const testQuiz = testQuizzes[0];
      const clues = testQuiz.questions[0].clues;
      const { getAllByTestId } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>
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
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>
      );

      const answerInput = getByLabelText("Answer");
      await userEvent.type(answerInput, testAnswer);
      expect(answerInput).toHaveValue(testAnswer);

    });

    test("Can handle inputting additional text for a question", async () => {
      const testReveal = "butts";
      const { getByLabelText } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>
      );

      const answerInput = getByLabelText("Additional text");
      await userEvent.type(answerInput, testReveal);
      expect(answerInput).toHaveValue(testReveal);

    });
  })

  describe("Properly handles submitting a quiz", () => {
    test("Submission button should initially be disabled", () => {
      const { getByText } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>
      );

      const submissionButton = getByText("Submit New Quiz");
      expect(submissionButton).toBeDisabled();
    });

    test("Can handle submitting a good quiz with one question", async () => {
      const saveQuizSpy = jest.spyOn(QuizService, "saveQuiz").mockImplementation((): Promise<void> => { return Promise.resolve() });

      const user = userEvent.setup();
      const testQuiz = { ...testQuizzes[0] };
      testQuiz.questions = [{ ...testQuiz.questions[0], revealOnAnswer: "butts" }];
      const { getByLabelText, getAllByTestId, getByText } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>
      );

      await EnterQuiz(getByLabelText, testQuiz, user);

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

      const submissionButton = getByText("Submit New Quiz");
      expect(submissionButton).toBeEnabled();
      fireEvent.click(submissionButton);

      expect(saveQuizSpy).toBeCalledTimes(1);
      expect(saveQuizSpy).toBeCalledWith(testQuiz);

    });

    jest.setTimeout(10_000);
    test("Can handle submitting a good quiz with multiple questions", async () => {
      const saveQuizSpy = jest.spyOn(QuizService, "saveQuiz").mockImplementation((): Promise<void> => { return Promise.resolve() });

      const user = userEvent.setup();
      const testQuiz = { ...testQuizzes[0] };
      testQuiz.questions = [{ ...testQuiz.questions[0], revealOnAnswer: "butts" }, { ...testQuiz.questions[1], revealOnAnswer: "foo" }];

      const { getByLabelText, getByTestId, getByText } = render(
        <MemoryRouter>   <NewQuizForm /></MemoryRouter>
      );

      await EnterQuiz(getByLabelText, testQuiz, user);

      const addQBtn = getByText(/Add Question/i);
      await userEvent.click(addQBtn);

      for (let jj = 0; jj < testQuiz.questions.length; jj++) {
        const questionDiv = getByTestId(`question${jj + 1}`);
        const questionText = testQuiz.questions[jj];

        const cluePrompts = within(questionDiv).getAllByTestId(/clue\d/);
        for (let ii = 0; ii < cluePrompts.length; ii++) {
          const cluePrompt = cluePrompts[ii];
          const clue = questionText.clues[ii];
          await user.type(cluePrompt, clue);
        }

        const testReveal = questionText.revealOnAnswer as string;
        const revealInput = within(questionDiv).getByLabelText("Additional text");
        await userEvent.type(revealInput, testReveal);

        const testAnswer = questionText.answer;
        const answerInput = within(questionDiv).getByLabelText("Answer");
        await userEvent.type(answerInput, testAnswer);
      }

      const submitBtn = getByText("Submit New Quiz");
      fireEvent.click(submitBtn);

      expect(saveQuizSpy).toBeCalledTimes(1);
      expect(saveQuizSpy).toBeCalledWith(testQuiz);

    });

    // This should probably get handled just in the service.
    test.skip("Properly handles submitting quiz with same name as existing quiz", async () => { });
  });
});

async function EnterQuiz(getByLabelText: { (id: Matcher, options?: SelectorMatcherOptions | undefined): HTMLElement; (arg0: string): any; }, testQuiz: { questions: Question[]; title: string; prompt: string; slug: string; time: number; }, user: UserEvent) {
  const quizPrompt = getByLabelText("Quiz Prompt");
  await userEvent.type(quizPrompt, testQuiz.prompt);
  expect(quizPrompt).toHaveValue(testQuiz.prompt);

  const quizTitle = getByLabelText("Quiz Title");
  await user.type(quizTitle, testQuiz.title);
  expect(quizTitle).toHaveValue(testQuiz.title);

  const timePrompt = getByLabelText("Time Limit (in minutes)");
  const timeInMinutes = testQuiz.time / 60;
  await userEvent.type(timePrompt, `${timeInMinutes}`);
  expect(timePrompt).toHaveValue(timeInMinutes);
}