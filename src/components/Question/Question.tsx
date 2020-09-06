import React, { useState } from "react";
import { Question, QuestionState } from "../../model/Question";
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
  const [answered, setAnswered] = useState(QuestionState.UNANSWERED);

  const submitAnswer = () => {
    if (
      currentGuess.toLocaleLowerCase() === question.answer.toLocaleLowerCase()
    ) {
      setAnswered(QuestionState.CORRECTLY_ANSWERED);
      const questionValue = question.clues.length - revealedClues;
      awardPoints(questionValue);
    } else {
      setAnswered(QuestionState.INCORRECTLY_ANSWERED);
      awardPoints(0);
    }
  };
  const revealOnAnswer = () => {
    if (QuestionState.UNANSWERED === answered) {
      return null;
    } else if (QuestionState.CORRECTLY_ANSWERED === answered) {
      const questionValue = question.clues.length - revealedClues;
      return <span>Correct! You get {questionValue} points.</span>;
    } else {
      return (
        <span>
          Incorrect! You get 0 points. The correct answer is {question.answer}.
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
        disabled={
          answered !== QuestionState.UNANSWERED ||
          revealedClues === question.clues.length - 1
        }
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
        Your Answer:
        <input
          disabled={answered !== QuestionState.UNANSWERED}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event?.currentTarget.value)}
        />
      </label>
      <button
        onClick={(event) => {
          submitAnswer();
        }}
        disabled={answered !== QuestionState.UNANSWERED}
      >
        Submit Guess
      </button>
      {revealOnAnswer()}
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
