import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "../../model/Quiz";
import * as QuizService from "../../model/QuizService";
import { ROUTES } from "../../routes";
import styles from "./HomePage.module.css";

type HomePageProps = {
  loadAllQuizzes?: () => Promise<Quiz[]>
}

export const HomePage: React.FunctionComponent<HomePageProps> = ({ loadAllQuizzes = QuizService.loadAllQuizzes }) => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  useEffect(() => {
    let isSubscribed = true;
    loadAllQuizzes().then(result => {
      if (isSubscribed) {
        setQuizList(result);
      }
    });
    return () => { isSubscribed = false; };
  });


  return (
    <div className={styles.question}>
      <h2>List of Quizzes</h2>
      <ul className={styles.clues}>
        {quizList.length !== 0 ?
          quizList.map((quiz) => (
            <li key={quiz.slug}>
              {/* Trying to thread the needle between statically defined `ROUTES.HOME = "/home"``
            and hard-coding `/quiz/{quiz.slug}` everywhere I need it.
            Might have done better with a route-generation function, even if that would get clunky. */}
              <Link to={ROUTES.QUIZ.replace(":id", quiz.slug)}>{quiz.title}</Link>
            </li>
          ))
          : <p>Loading...</p>
        }
      </ul>
    </div>
  );
};
