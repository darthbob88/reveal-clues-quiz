import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the app properly", () => {
  const { getByText, container } = render(<App />);
  const linkElement = getByText(/Raymond's Quiz App/i);
  expect(linkElement).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
