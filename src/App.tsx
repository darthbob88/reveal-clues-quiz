import React from "react";
import "./App.css";
import { defaultQuiz, QuizState } from "./model/Quiz";
import { QuizComponent } from "./components/Quiz/QuizComponent";
// TODO: Fix this to use a router and load the quiz on pageload.
function App() {
  const quizState = new QuizState(defaultQuiz);
  return (
    <div className="App">
      <header>Raymond's Quiz App</header>
      <details className="description">
        <summary>How to Play</summary>
        Each question in this quiz will involve a series of increasingly-obvious
        clues. If you get the question right after the first clue, you get the
        maximum number of points (4 points if the question has 4 clues, 3 points if
        it has 3 clues, etc). Each additional clue you need reduces the
        value by 1 point, down to 1 point if you need all the clues. HOWEVER,
        you only get one chance to answer, and if you answer wrong, you get 0
        points. So it's better to ask for another clue and get 3 points than
        get a question wrong and get 0 points.
        <br />
        Additionally- Due to programmer laziness, we are not particular about
        casing, but we are particular about spelling. "the sex pistols" is
        correct, "Sex Pistols" is not. This is issue #3 to fix, after adding
        the ability to generate new quizzes.
      </details>
      <QuizComponent quiz={quizState} />
    </div>
  );
}

export default App;
