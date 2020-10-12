import React, { useState } from "react";
import { QuizState } from "../../model/Quiz";
import styles from "./Quiz.module.css";
import { QuestionComponent } from "../Question/Question";
import { QuestionEnum, QuestionState } from "../../model/Question";
import { observer } from "mobx-react";

type QuizProps = {
  quiz: QuizState;
};
export const QuizComp: React.FunctionComponent<QuizProps> = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = quiz.currentQuiz.questions;

  const prevQuestion = () => {
    const prev = (questions.length + currentQuestion - 1) % questions.length;
    setCurrentQuestion(prev);
  };

  const nextQuestion = () => {
    const next = (currentQuestion + 1) % questions.length;
    //Due to a poor decision on my part, this is actually the number of indexes past `next` to skip.
    const unansweredQs = quiz.quizState
      .slice(next)
      .findIndex((question) => question.state === QuestionEnum.UNANSWERED);
    setCurrentQuestion(next + unansweredQs);
  };

  const scoreQuestion = (points: QuestionState) => {
    quiz.scoreQuestion(currentQuestion, points);
    setTimeout(() => {
      nextQuestion();
    }, 800);
  };

  return (
    <div className={styles.quiz}>
      <p>
        Current score: {quiz.scorePoints} pts {quiz.scorePercent}/
        {quiz.quizState.length} question(s) correct
      </p>
      <ul className={styles.questions}>
        {quiz.quizState.map((question, index) => (
          <li
            key={index}
            onClick={() => setCurrentQuestion(index)}
            className={`${index === currentQuestion ? styles.current : ""}
              ${
                //TODO: This is ugly, but I can't find a good way to make this a mapping.
                question.state === QuestionEnum.UNANSWERED
                  ? styles.unanswered
                  : question.state === QuestionEnum.CORRECTLY_ANSWERED
                  ? styles.correct
                  : styles.incorrect
              }`}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <button onClick={() => prevQuestion()}>&lt; Previous Question</button>
      <button onClick={() => nextQuestion()}>Next Question &gt;</button>
      <QuestionComponent
        question={questions[currentQuestion]}
        state={quiz.quizState[currentQuestion]}
        awardPoints={scoreQuestion}
      />
    </div>
  );
};

export const QuizComponent = observer(QuizComp);
