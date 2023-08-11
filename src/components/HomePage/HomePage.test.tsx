import React from "react";
import { act, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router-dom";
import { testQuizzes } from "../../model/Quiz";

// TODO: For some reason, these tests fail because of Firebase. Fix that, would you?
xdescribe("Home page", () => {

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