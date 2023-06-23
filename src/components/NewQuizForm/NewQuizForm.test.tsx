import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
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

  test("removes a clue from a question when the button is clicked", () => {
    const { getByTestId } = render(
      <NewQuizForm />
    );

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

  test("adds a clue to a question when the button is clicked", () => {
    const { getByTestId } = render(
      <NewQuizForm />
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

})