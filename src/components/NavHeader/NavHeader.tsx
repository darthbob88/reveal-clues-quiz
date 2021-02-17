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
        <br />
        <br />
        EG: If you know which US state is home to <a href="https://www.atlasobscura.com/places/widow-jane-mine">the Widow Jane Mine</a>,
        you get 4 points. If you need another clue, that this state is also home to the <a href="https://www.atlasobscura.com/places/jello-gallery-museum">JELL-O Gallery Museum</a> you will get only 3 points for a correct answer. If you need to hear that this state also has the <a href="https://www.atlasobscura.com/places/amityville-horror-house">Amityville Horror house</a>,
you only get 2 points. If you can't get the answer until you hear that this state also has the <a href="https://www.nps.gov/stli/index.htm">Statue of Liberty Enlightening the World</a>, you only get 1 point.
<br />
On the other hand, if you answered wrongly based on any of those clues, you'd only get 0 points.
<br></br>
(The state is New York, FYI)
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
          correct, "Sex Pistols" is not.</li>
        </ul>
      </details>

    </header>
  );

};
