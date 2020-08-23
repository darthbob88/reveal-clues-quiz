import React, { useState } from "react";
import { Question } from "../../model/Question";
import styles from "./Question.module.css";

type QuestionProps = {
  question: Question;
  awardPoints: Function;
};
export const QuestionComponent: React.FunctionComponent<QuestionProps> = ({
  question,
  awardPoints,
}) => {
  const [revealedClues, setRevealedClues] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [answered, setAnswered] = useState(false);

  const revealOnAnswer = (answered: boolean) => {
    if (!answered) return null;
    if (
      currentGuess.toLocaleLowerCase() === question.answer.toLocaleLowerCase()
    ) {
      awardPoints(question.clues.length - revealedClues);
      return (
        <span>
          Correct! You get {question.clues.length - revealedClues} points.
        </span>
      );
    } else {
      awardPoints(0);
      return (
        <span>
          Incorrect! You get 0 points. The correct answer is {question.answer}.{" "}
        </span>
      );
    }
  };

  return (
    <div className={styles.question}>
      <span className="prompt">In what state will you find...</span>
      {/* Now where the hell do I get the prompt? */}
      <button
        onClick={() => setRevealedClues(revealedClues + 1)}
        disabled={answered || revealedClues === question.clues.length - 1}
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
      <label>
        Your Answer: {"  "}
        <input
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event?.currentTarget.value)}
        />
      </label>
      <button onClick={() => setAnswered(true)} disabled={answered}>
        Submit Guess
      </button>
      {revealOnAnswer(answered)}
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
