import React from "react";
import { act, render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import * as QuizService from "./model/QuizService";
import { testQuizzes } from "./model/Quiz";

// TODO: Deactivated because it has the same problem as the Homepage test, relying on Firebase.
// I expect the best solution would be to put the quiz service in a module we can jest.spyOn but that can wait.
test("renders the app properly", async () => {
  jest.spyOn(QuizService, "loadAllQuizzes").mockResolvedValue([testQuizzes[0]]);

  await act(async () => {
    const { getByText, container } = render(<MemoryRouter><App /></MemoryRouter>);
    const linkElement = getByText(/Raymond's Quiz App/i);
    expect(linkElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
});
