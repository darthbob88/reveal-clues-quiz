import React, { useState } from "react";
import { Question } from "../../model/Question";
import { defaultQuiz, emptyQuestion, emptyQuiz } from "../../model/Quiz";
import { QuestionComp } from "../Question/Question";
import styles from "./NewQuizForm.module.css";

export const NewQuizForm: React.FunctionComponent = () => {
  const [newQuiz, setNewQuiz] = useState(defaultQuiz);

  const removeQuestion = (index: number) => {
    let tempQs = newQuiz.questions;
    tempQs.splice(index, 1);
    setNewQuiz({ ...newQuiz, questions: tempQs });
  };

  const addQuestion = () => {
    let tempQs = newQuiz.questions;
    tempQs.push(emptyQuestion);
    setNewQuiz({ ...newQuiz, questions: tempQs });
  };

  const updateQuestion = (QIdx: number, updatedQuestion: Question) => {
    let tempQs = newQuiz.questions;
    tempQs[QIdx] = updatedQuestion;
    setNewQuiz({ ...newQuiz, questions: tempQs });

    // console.log(`Updating question ${JSON.stringify(updatedQuestion)}`);
  }

  const submitQuiz = () => {
    console.log(`New quiz is ${JSON.stringify(newQuiz)}`);
  };

  return (
    <form className={styles.question}>
      <p>
        <label>
          Quiz Title
          <input
            type="text"
            onChange={(evt) =>
              setNewQuiz({ ...newQuiz, title: evt.target.value })
            }
            value={newQuiz.title}
          />
        </label>
      </p>
      <p>
        <label>
          Quiz Prompt
          <input
            type="text"
            onChange={(evt) =>
              setNewQuiz({ ...newQuiz, prompt: evt.target.value })
            }
            value={newQuiz.prompt}
          />{" "}
        </label>
      </p>
      <button
        onClick={(event) => {
          event.preventDefault();
          addQuestion();
        }}
      >
        Add Question
      </button>
      {newQuiz.questions.map((question, QIdx) => {
        return (
          <SingleQuestion key={QIdx} question={question} QIdx={QIdx} removeQuestion={removeQuestion} updateQuestion={updateQuestion} />);
      })}
      <button
        onClick={(event) => {
          event.preventDefault();
          submitQuiz();
        }}
      >
        Submit New Quiz
      </button>
    </form>
  );
};

type SingleQuestionProps = {
  question: Question;
  QIdx: number;
  updateQuestion: Function;
  removeQuestion: Function
}

const SingleQuestion: React.FunctionComponent<SingleQuestionProps> = ({ question, QIdx, updateQuestion, removeQuestion }) => {

  const updateClue = (event: React.ChangeEvent<HTMLInputElement>, clueIdx: number) => {
    const newClue = event.target.value;
    const updatedQuestion = question;
    updatedQuestion.clues[clueIdx] = newClue;
    updateQuestion(QIdx, updatedQuestion);
  }

  const updateAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    const updatedQuestion = question;
    updatedQuestion.answer = newAnswer;
    updateQuestion(QIdx, updatedQuestion);
  }

  return (<div >
    <h3>Question {QIdx + 1}</h3>
    <button
      onClick={(event) => {
        event.preventDefault();
        removeQuestion(QIdx);
      }}
    >
      X
    </button>
    <ol>
      {question.clues.map((clue, clueIdx) => (
        <li key={clueIdx}>
          <input type="text" data-index={clueIdx} value={clue} onChange={(event) => updateClue(event, clueIdx)} />
        </li>
      ))}
    </ol>
    <label>
      Answer <input type="text" onChange={(event) => updateAnswer(event)} value={question.answer} />
    </label>
  </div>)

}