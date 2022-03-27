import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { NewQuizForm } from "./NewQuizForm";

describe("New Quiz component", () => {
  test("renders the new quiz form properly", () => {
    const { container } = render(
      <NewQuizForm />
    );

    expect(container).toMatchSnapshot();
  });

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

})