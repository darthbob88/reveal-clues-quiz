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
    // This is stupid, but I can't think of a much better method
    let prev = questions.length + currentQuestion - 1;
    while (
      quiz.quizState[prev % questions.length].state !== QuestionEnum.UNANSWERED
    ) {
      prev--;
    }
    setCurrentQuestion(prev % questions.length);
  };

  const nextQuestion = () => {
    let next = currentQuestion + 1;
    while (
      quiz.quizState[next % questions.length].state !== QuestionEnum.UNANSWERED
    ) {
      next++;
    }
    setCurrentQuestion(next % questions.length);
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
        Time remaining: {quiz.display} <br />
        Current score: {quiz.scorePoints} pts {quiz.scorePercent}/
        {quiz.quizState.length} question(s) correct
        {quiz.startedQuiz ? "" : <button className={styles.startQuiz} onClick={quiz.startQuiz}>Start Quiz</button>}
      </p>
      <div className={`${!quiz.startedQuiz ? styles.disabled : ""}`}>
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
    </div>
  );
};

export const QuizComponent = observer(QuizComp);
