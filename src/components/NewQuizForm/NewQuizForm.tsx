import React, { useState } from "react";
import { defaultQuiz, emptyQuiz } from "../../model/Quiz";
import styles from "./NewQuizForm.module.css";

export const NewQuizForm: React.FunctionComponent = () => {

  const [newQuiz, setNewQuiz] = useState(defaultQuiz);

  const submitAnswer = () => {
    console.log(`New quiz is ${JSON.stringify(newQuiz)}`);
  };

  return (
    <form className={styles.question}>
      <p>      <label>Quiz Title <input type="text" value={newQuiz.title} /> </label></p>
      <p>      <label>Quiz Prompt <input type="text" value={newQuiz.prompt} /> </label></p>
      {newQuiz.questions.map((question, idx) => {
        return (<div><h3>Question {idx + 1}</h3><ul>
          {question.clues.map((clue, idx) => <li>  <textarea data-index={idx} rows={3} value={clue} /></li>)}
        </ul>
          <label>Answer <input type="text" value={question.answer} /> </label>
        </div>)
      })}
      <button
        onClick={(event) => {
          event.preventDefault();
          submitAnswer();
        }}
      >
        Submit Guess
      </button>
    </form>
  );
};