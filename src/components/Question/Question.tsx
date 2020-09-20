import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { Question, QuestionEnum } from "../../model/Question";
import styles from "./Question.module.css";

type QuestionProps = {
  question: Question;
  awardPoints: Function;
};
export const QuestionComp: React.FunctionComponent<QuestionProps> = ({
  question,
  awardPoints,
}) => {
  const [revealedClues, setRevealedClues] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [answered, setAnswered] = useState(QuestionEnum.UNANSWERED);

  useEffect(() => {
    return () => {
      setRevealedClues(0);
      setCurrentGuess("");
      setAnswered(QuestionEnum.UNANSWERED);
    };
  }, [question]);

  const submitAnswer = () => {
    if (
      currentGuess.toLocaleLowerCase() === question.answer.toLocaleLowerCase()
    ) {
      setAnswered(QuestionEnum.CORRECTLY_ANSWERED);
      const questionValue = question.clues.length - revealedClues;
      awardPoints(questionValue);
    } else {
      setAnswered(QuestionEnum.INCORRECTLY_ANSWERED);
      awardPoints(0);
    }
  };
  const revealOnAnswer = () => {
    if (QuestionEnum.UNANSWERED === answered) {
      return null;
    } else if (QuestionEnum.CORRECTLY_ANSWERED === answered) {
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
          answered !== QuestionEnum.UNANSWERED ||
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
          disabled={answered !== QuestionEnum.UNANSWERED}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event?.currentTarget.value)}
        />
      </label>
      <button
        onClick={(event) => {
          submitAnswer();
        }}
        disabled={answered !== QuestionEnum.UNANSWERED}
      >
        Submit Guess
      </button>
      {revealOnAnswer()}
    </div>
  );
};

export const QuestionComponent = observer(QuestionComp);

type ClueProps = { clue: string; revealed: boolean };
const ClueComponent: React.FunctionComponent<ClueProps> = ({
  clue,
  revealed,
}) => {
  return <li>{revealed ? clue : "-----------"}</li>;
};
