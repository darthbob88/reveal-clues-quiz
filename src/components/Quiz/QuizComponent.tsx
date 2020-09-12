import React, { useState } from "react";
import { Quiz } from "../../model/Quiz";
import styles from "./Quiz.module.css";
import { QuestionComponent } from "../Question/Question";

type QuizProps = {
  quiz: Quiz;
  awardPoints: Function;
};
export const QuizComponent: React.FunctionComponent<QuizProps> = ({
  quiz,
  awardPoints,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const prevQuestion = () => {
    const prev =
      (quiz.questions.length + currentQuestion - 1) % quiz.questions.length;
    setCurrentQuestion(prev);
  };
  const nextQuestion = () => {
    const next = (currentQuestion + 1) % quiz.questions.length;
    setCurrentQuestion(next);
  };
  const scoreQuestion = (points: number) => {
    awardPoints(points);
    nextQuestion();
  };
  return (
    <div className={styles.quiz}>
      <button onClick={() => prevQuestion()}>&lt; Previous Question</button>
      <button onClick={() => nextQuestion()}>Next Question &gt;</button>
      <QuestionComponent
        question={quiz.questions[currentQuestion]}
        awardPoints={scoreQuestion}
      />
    </div>
  );
};
