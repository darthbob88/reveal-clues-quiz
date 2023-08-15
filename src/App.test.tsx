import React from "react";
import { act, render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

// TODO: Deactivated because it has the same problem as the Homepage test, relying on Firebase.
// I expect the best solution would be to put the quiz service in a module we can jest.spyOn but that can wait.
xtest("renders the app properly", async () => {
  await act(async () => {
    const { getByText, container } = render(<MemoryRouter><App /></MemoryRouter>);
    const linkElement = getByText(/Raymond's Quiz App/i);
    expect(linkElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
});
