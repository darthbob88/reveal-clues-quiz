import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { Question, QuestionEnum, QuestionState } from "../../model/Question";
import styles from "./Question.module.css";

type QuestionProps = {
  question: Question;
  state: QuestionState;
  awardPoints: Function;
};
export const QuestionComp: React.FunctionComponent<QuestionProps> = ({
  question,
  state,
  awardPoints,
}) => {
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    return () => {
      setCurrentGuess("");
    };
  }, [question]);

  const submitAnswer = () => {
    const qState: Partial<QuestionState> = {
      revealedClues: state.revealedClues,
    };

    if (
      currentGuess.toLocaleLowerCase() === question.answer.toLocaleLowerCase()
    ) {
      const questionValue = question.clues.length - state.revealedClues;
      qState.score = questionValue;
      qState.state = QuestionEnum.CORRECTLY_ANSWERED;
    } else {
      qState.state = QuestionEnum.INCORRECTLY_ANSWERED;
      qState.score = 0;
    }
    awardPoints(qState);
  };
  const revealOnAnswer = () => {
    if (QuestionEnum.UNANSWERED === state.state) {
      return null;
    } else if (QuestionEnum.CORRECTLY_ANSWERED === state.state) {
      const questionValue = question.clues.length - state.revealedClues;
      return <span>Correct! You get {questionValue} points.</span>;
    } else {
      return (
        <span>
          Incorrect! You get 0 points. The correct answer is {question.answer}.
        </span>
      );
    }
  };
  const revealAnotherClue = () => {
    state.revealedClues = state.revealedClues + 1;
  };

  return (
    <div className={styles.question}>
      <span className="prompt">In what state will you find...</span>
      {/* Now where the hell do I get the prompt? */}
      <button
        onClick={() => revealAnotherClue()}
        disabled={
          state.state !== QuestionEnum.UNANSWERED ||
          state.revealedClues === question.clues.length - 1
        }
      >
        Reveal Another Clue
      </button>
      <span>{1 + state.revealedClues} clues revealed</span>
      <ul className={styles.clues}>
        {question.clues.map((clue, index) => (
          <ClueComponent
            key={index}
            clue={clue}
            revealed={index <= state.revealedClues}
          />
        ))}
      </ul>
      <label>
        Your Answer:
        <input
          disabled={state.state !== QuestionEnum.UNANSWERED}
          value={currentGuess}
          onKeyPress={(event) => (event.key === "Enter" ? submitAnswer() : "")}
          onChange={(event) => setCurrentGuess(event?.currentTarget.value)}
        />
      </label>
      <button
        onClick={(event) => {
          submitAnswer();
        }}
        disabled={state.state !== QuestionEnum.UNANSWERED}
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
