import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders my header", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Raymond's Quiz App/i);
  expect(linkElement).toBeInTheDocument();
});
