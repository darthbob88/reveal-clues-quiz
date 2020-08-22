import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Raymond's Quiz App</header>
      <article className="description">
        Each question in this quiz will involve a series of clues. If you get
        the question right after the first clue, you get the maximum number of
        points, each additional clue you need reduces the value by 1 point, down
        to 1 point if you need all the clues. HOWEVER, you only get one chance
        to answer, and if you answer wrong, you get 0 points. So it's better to
        ask for another clue and get 3 points than get a question wrong and get
        0.
      </article>
    </div>
  );
}

export default App;
