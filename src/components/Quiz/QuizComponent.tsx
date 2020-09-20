import React, { useState } from "react";
import { QuizState } from "../../model/Quiz";
import styles from "./Quiz.module.css";
import { QuestionComponent } from "../Question/Question";
import { QuestionEnum } from "../../model/Question";

type QuizProps = {
  quiz: QuizState;
};
export const QuizComponent: React.FunctionComponent<QuizProps> = ({ quiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const questions = quiz.currentQuiz.questions;

  const prevQuestion = () => {
    const prev = (questions.length + currentQuestion - 1) % questions.length;
    setCurrentQuestion(prev);
  };
  const nextQuestion = () => {
    //TODO: Fix this to use the quiz state.
    const next = (currentQuestion + 1) % questions.length;
    setCurrentQuestion(next);
  };
  const scoreQuestion = (points: number) => {
    setScore(score + points);
    quiz.scoreQuestion(currentQuestion, {
      score: points,
      state: QuestionEnum.CORRECTLY_ANSWERED,
    });
    setTimeout(() => {
      nextQuestion();
    }, 800);
  };
  return (
    <div className={styles.quiz}>
      <p>
        Current score: {quiz.scorePoints} pts {quiz.scorePercent}%
      </p>
      <button onClick={() => prevQuestion()}>&lt; Previous Question</button>
      <button onClick={() => nextQuestion()}>Next Question &gt;</button>
      <QuestionComponent
        question={questions[currentQuestion]}
        awardPoints={scoreQuestion}
      />
    </div>
  );
};
