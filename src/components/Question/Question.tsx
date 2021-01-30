import { observer } from "mobx-react";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Question, QuestionEnum, QuestionState } from "../../model/Question";
import styles from "./Question.module.css";

type QuestionProps = {
  prompt?: string;
  question: Question;
  state: QuestionState;
  awardPoints: Function;
};
export const QuestionComp: React.FunctionComponent<QuestionProps> = ({
  question,
  state,
  awardPoints,
  prompt
}) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (null != inputRef.current) {
      inputRef.current.focus();
    } return () => {
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
    } else {
      let result = "";
      if (QuestionEnum.CORRECTLY_ANSWERED === state.state) {
        const questionValue = question.clues.length - state.revealedClues;
        result = `Correct! You get ${questionValue} points.`;
      } else {
        result = `Incorrect! You get 0 points. The correct answer is ${question.answer}.`;
      }
      return <span>{result} {question.revealOnAnswer != null && <ReactMarkdown source={question.revealOnAnswer} />} </span>;
    }
  };
  const revealAnotherClue = () => {
    state.revealedClues = state.revealedClues + 1;
  };

  return (
    <div className={styles.question}>
      <span className={styles.prompt}>For {question.clues.length - state.revealedClues} point(s), {prompt}</span>
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
        <input ref={inputRef}
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
