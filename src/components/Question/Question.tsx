import React, { Component, useState } from "react";
import { Question } from "../../model/Question";
type QuestionProps = {
  question: Question;
};
export const QuestionComponent: React.FunctionComponent<QuestionProps> = ({
  question,
}) => {
  const [revealedClues, setRevealedClues] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  /* PLAN: 
        <prompt>
        <show another clue button => increments numbers of clues shown, decrements number of points.>
        <clue 1>
        <either black bar or clue
    */
  const submitGuess = () => {
    if (currentGuess.toLocaleLowerCase() === question.answer) {
      return <span>Correct!</span>;
    } else {
      return <span>Incorrect! The correct answer is {question.answer}. </span>;
    }
  };
  return (
    <div>
      <span className="prompt">In what state will you find...</span>
      {/* Now where the hell do I get the prompt? */}
      <button
        onClick={() => setRevealedClues(revealedClues + 1)}
        disabled={revealedClues === question.clues.length - 1}
      >
        Reveal Another Clue
      </button>
      <ul className="clues">
        {question.clues.map((clue, index) => (
          <ClueComponent
            key={index}
            clue={clue}
            revealed={index <= revealedClues}
          />
        ))}
      </ul>
      <input
        value={currentGuess}
        onChange={(event) => setCurrentGuess(event?.currentTarget.value)}
      />
      <button onClick={() => submitGuess()}>Submit Guess</button>
    </div>
  );
};

type ClueProps = { clue: string; revealed: boolean };
const ClueComponent: React.FunctionComponent<ClueProps> = ({
  clue,
  revealed,
}) => {
  return <li>{revealed ? clue : "-----------"}</li>;
};
