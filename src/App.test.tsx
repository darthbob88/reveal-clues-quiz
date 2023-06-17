import React from "react";
import { act, render } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test("renders the app properly", async () => {
  await act(async () => {
    const { getByText, container } = render(<MemoryRouter><App /></MemoryRouter>);
    const linkElement = getByText(/Raymond's Quiz App/i);
    expect(linkElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
});
