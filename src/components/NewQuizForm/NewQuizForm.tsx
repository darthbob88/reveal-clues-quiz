import React, { useState } from "react";
import { Question } from "../../model/Question";
import { emptyQuestion, emptyQuiz, Quiz } from "../../model/Quiz";
import { saveNewQuiz } from "../../model/QuizService";
import styles from "./NewQuizForm.module.css";

/* TODO: Remaining tasks
Add an authorship field; this may require integrating with Firebase to get user ID.
Add a field for time. Either a dropdown in 30s intervals, or a number input for number of minutes.
Add some upper limits; no more than 10 questions and 10 clues each, or whatever.
Validation; require all fields, at least one non-blank clue and answer for each question, etc.
*/
export const NewQuizForm: React.FunctionComponent = () => {
  const blankQuiz: Quiz = { ...emptyQuiz, questions: [{ clues: ["", "", "", ""], answer: "", revealOnAnswer: "" }] };
  const [newQuiz, setNewQuiz] = useState(blankQuiz);

  const canRemoveQuestion = newQuiz.questions.length > 1;
  const removeQuestion = (index: number) => {
    let tempQs = newQuiz.questions;
    if (newQuiz.questions.length <= 1)
      return;
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
  }

  const submitQuiz = () => {
    // TODO Fix this slugification
    newQuiz.slug = newQuiz.title.toLocaleLowerCase().replace(/\s/g, "-");
    saveNewQuiz(newQuiz);
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
          <SingleQuestion key={QIdx} question={question} QIdx={QIdx} removeQuestion={removeQuestion} canRemoveQuestion={canRemoveQuestion} updateQuestion={updateQuestion} />);
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
  removeQuestion: Function;
  canRemoveQuestion: boolean
}

const SingleQuestion: React.FunctionComponent<SingleQuestionProps> = ({ question, QIdx, updateQuestion, removeQuestion, canRemoveQuestion }) => {

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
  const updateAddedText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    const updatedQuestion = question;
    updatedQuestion.revealOnAnswer = newAnswer;
    updateQuestion(QIdx, updatedQuestion);
  }

  const addClue = () => {
    const updatedQuestion = question;
    updatedQuestion.clues.push("");
    updateQuestion(QIdx, updatedQuestion);
  }
  const removeClue = (clueIdx: number) => {
    let tempClues = question.clues;
    tempClues.splice(clueIdx, 1);

    updateQuestion(QIdx, { ...question, clues: tempClues });
  }

  return (<div data-testid={"question" + (QIdx + 1)}>
    <h3>Question {QIdx + 1}</h3>
    <button data-testid="remove-question"
      disabled={!canRemoveQuestion}
      onClick={(event) => {
        event.preventDefault();
        removeQuestion(QIdx);
      }}
    >
      X
    </button>
    <button data-testid="add-clue"
      onClick={(event) => {
        event.preventDefault();
        addClue();
      }}
    >
      Add Clue
    </button>
    <ol>
      {question.clues.map((clue, clueIdx) => (
        <li key={clueIdx} >
          <input type="text" data-index={clueIdx} data-testid={"clue" + (clueIdx + 1)} value={clue} onChange={(event) => updateClue(event, clueIdx)} />
          <button data-testid="remove-clue" disabled={question.clues.length <= 1}
            onClick={(event) => {
              event.preventDefault();
              removeClue(clueIdx);
            }}
          >
            X
          </button>
        </li>
      ))}
    </ol>
    <label>
      Answer <input type="text" onChange={(event) => updateAnswer(event)} value={question.answer} />
    </label>
    <label>
      Additional text <input type="text" onChange={(event) => updateAddedText(event)} value={question.revealOnAnswer} />
    </label>
  </div>)

}