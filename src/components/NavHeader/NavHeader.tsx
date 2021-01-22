import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

export const NavHeader = () => {

  return (
    <header>
      <h1>Raymond's Quiz App</h1>
      <Link to={ROUTES.HOME}>Home</Link>
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
      </details>
      <details className="description">
        <summary>Known Issues</summary>
        <ul>
          <li>Only got two quizzes. Looking to get some more, and to add a "Create your own quiz"
            feature, but for now, two hard-coded quizzes.</li>
          <li>Not accessible enough. I've made an effort to keep things high-contrast,
          properly keyboard-navigable, and use semantic HTML, but there's probably
          some other use cases I've missed.
          </li>
          <li>Due to programmer laziness, we are not particular about
          casing, but we only accept one spelling and phrasing. "the sex pistols" is
          correct, "Sex Pistols" is not. This is issue #3 to fix, after adding
        the ability to generate new quizzes.</li>
        </ul>
      </details>

    </header>
  );

};
