import React from "react";
import { fireEvent, getByTestId, queryByTestId, render, within } from "@testing-library/react";
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

})