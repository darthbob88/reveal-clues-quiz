import React, { Fragment, useContext, useState } from "react";
import { QuizEnum, QuizStateContext } from "../../model/Quiz";
import styles from "./Quiz.module.css";
import { QuestionComponent } from "../Question/Question";
import { QuestionEnum, QuestionState } from "../../model/Question";
import { observer } from "mobx-react";

export const QuizComp: React.FunctionComponent = () => {
  const quiz = useContext(QuizStateContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = quiz.currentQuiz.questions;

  const prevQuestion = () => {
    // This is stupid, but I can't think of a much better method
    let prev = questions.length + currentQuestion - 1;
    while (prev > currentQuestion &&
      quiz.quizState[prev % questions.length].state !== QuestionEnum.UNANSWERED
    ) {
      prev--;
    }
    setCurrentQuestion(prev % questions.length);
  };

  const nextQuestion = () => {
    let next = currentQuestion + 1;
    while (next !== currentQuestion &&
      quiz.quizState[next % questions.length].state !== QuestionEnum.UNANSWERED
    ) {
      next = (next + 1) % questions.length;
    }
    setCurrentQuestion(next % questions.length);
  };

  const scoreQuestion = (points: QuestionState) => {
    quiz.scoreQuestion(currentQuestion, points);
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const quizContent = () => {
    if (quiz.quizStatus === QuizEnum.UNSTARTED) {
      return <button className={styles.startQuiz} onClick={quiz.startQuiz}>Start Quiz</button>
    } else {
      return <Fragment>
        <QuestionComponent
          question={questions[currentQuestion]}
          state={quiz.quizState[currentQuestion]}
          awardPoints={scoreQuestion}
          prompt={quiz.currentQuiz.prompt}
        />
      </Fragment>
    }
  }

  return (
    <div className={`${quiz.quizStatus === QuizEnum.UNSTARTED ? styles.disabled : styles.quiz}`}>
      <p>
        Time remaining: {quiz.display} <br />
        Current score: {quiz.scorePoints} pts {quiz.scorePercent}/
        {quiz.quizState.length} question(s) correct
      </p>
      <div>
        <ul className={styles.questions}>
          {quiz.quizState.map((question, index) => (
            <li tabIndex={0}
              key={index}
              onKeyPress={(event) => (event.key === "Enter" ? setCurrentQuestion(index) : "")}
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
        <div className={styles.nextPrevQs}>
          <button onClick={() => prevQuestion()}
            onKeyPress={(event) => (event.key === "Enter" ? prevQuestion() : "")}
            disabled={quiz.quizStatus !== QuizEnum.IN_PROGRESS}>&lt; Previous Question</button>
          <button onClick={() => nextQuestion()}
            onKeyPress={(event) => (event.key === "Enter" ? nextQuestion() : "")}
            disabled={quiz.quizStatus !== QuizEnum.IN_PROGRESS}>Next Question &gt;</button>
        </div>
        {quizContent()}
        {quiz.quizStatus === QuizEnum.COMPLETED
          ? <span>Congratulations! Your final score is {quiz.scorePoints} / {quiz.maxScore} </span>
          : ""}
      </div>
    </div>
  );
};

export const QuizComponent = observer(QuizComp);
