import React from "react";
import { act, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import { testQuizzes } from "../../model/Quiz";
import { loadAllQuizzes } from "../../model/QuizService";
describe("Home page", () => {

  test("renders the home page properly", async () => {
    await act(async () => {
      const loadAllQuizzes = jest.fn().mockResolvedValue(testQuizzes);
      const { getByText, container } = render(<MemoryRouter><HomePage /></MemoryRouter>);
      const linkElement = getByText(/List of Quizzes/i);
      expect(linkElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();

      await waitForElementToBeRemoved(() => getByText('Loading...'))
    })

  });


  test("loads quizzes properly", async () => {
    await act(async () => {
      const loadAllQuizzes = jest.fn().mockResolvedValue(testQuizzes);
      const { getByText, container } = render(<MemoryRouter><HomePage /></MemoryRouter>);
      const linkElement = getByText(/List of Quizzes/i);
      expect(linkElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();

      await waitFor(() => getByText(testQuizzes[0].title));
      getByText(testQuizzes[1].title);
    })

  });
})