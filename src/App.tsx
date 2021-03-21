import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "./routes";
import { HomePage } from "./components/HomePage/HomePage";
import { QuizPage } from "./components/Quiz/QuizPage";
import { NavHeader } from "./components/NavHeader/NavHeader";
import { NavFooter } from "./components/NavFooter/NavFooter";
import { NewQuizForm } from "./components/NewQuizForm/NewQuizForm";
function App() {
  return (
    <div className="App">
      <NavHeader />
      <div className="content">
        <Switch>
          <Route path={ROUTES.HOME} exact component={HomePage} />
          <Route path={ROUTES.LANDING} exact component={HomePage} />
          <Route path={ROUTES.QUIZ} component={QuizPage} />
          {/* TODO: Add a link to this in the header */}
          <Route path={ROUTES.NEW_QUIZ} component={NewQuizForm} />
        </Switch></div>
      <NavFooter />
    </div>
  );
}

export default App;
