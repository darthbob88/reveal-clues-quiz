import React from "react";
import { render } from "@testing-library/react";
import { NewQuizForm } from "./NewQuizForm";

describe("New Quiz component", () => {
  test("renders the new quiz form properly", () => {
    const { container } = render(
      <NewQuizForm />
    );

    expect(container).toMatchSnapshot();
  });


})