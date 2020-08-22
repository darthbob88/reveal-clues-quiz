import React, { Component, useState } from "react";
import { Question } from "../model/Question";
type QuestionProps = {
  question: Question;
};
export const QuestionComponent: React.FunctionComponent<QuestionProps> = ({
  question,
}) => {
  const [revealedClues, setRevealedClues] = useState(1);
  const [currentGuess, setCurrentGuess] = useState("");
  /* PLAN: 
        <prompt>
        <show another clue button => increments numbers of clues shown, decrements number of points.>
        <clue 1>
        <either black bar or clue
    */
  return (
    <div>
      {/* Now where the hell do I get the prompt? */}
      <button onClick={() => setRevealedClues(revealedClues + 1)}>
        Reveal Another Clue
      </button>
      {question.clues.map((clue, index) => (
        <ClueComponent clue={clue} revealed={index <= revealedClues} />
      ))}
      <input
        value={currentGuess}
        onChange={(event) => setCurrentGuess(event?.currentTarget.value)}
      />
    </div>
  );
};

type ClueProps = { clue: string; revealed: boolean };
const ClueComponent: React.FunctionComponent<ClueProps> = ({
  clue,
  revealed,
}) => {
  return <span>{revealed ? clue : "-----------"}</span>;
};
