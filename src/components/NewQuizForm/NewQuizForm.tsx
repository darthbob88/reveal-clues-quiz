import React, { useState } from "react";
import { defaultQuiz, emptyQuestion, emptyQuiz } from "../../model/Quiz";
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
      {newQuiz.questions.map((question, idx) => {
        return (
          <div key={question.answer}>
            <h3>Question {idx + 1}</h3>
            <button
              onClick={(event) => {
                event.preventDefault();
                removeQuestion(idx);
              }}
            >
              X
            </button>
            <ul>
              {question.clues.map((clue, idx) => (
                <li key={clue}>
                  <textarea data-index={idx} rows={3} value={clue} />
                </li>
              ))}
            </ul>
            <label>
              Answer <input type="text" value={question.answer} />
            </label>
          </div>
        );
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
