import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { ROUTES } from "./routes";
import { HomePage } from "./components/HomePage/HomePage";
import { QuizPage } from "./components/Quiz/QuizPage";
import { NavHeader } from "./components/NavHeader/NavHeader";
import { NavFooter } from "./components/NavFooter/NavFooter";
import { Routes } from "react-router";
import { NewQuizForm } from "./components/NewQuizForm/NewQuizForm";
import { SignInForm } from "./components/SignInForm/SignInForm";
import { SignUpForm } from "./components/SignInForm/SignUpForm";

function App() {
  return (
    <div className="App">
      <NavHeader />
      <div className="content">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LANDING} element={<HomePage />} />
          <Route path={ROUTES.QUIZ} element={<QuizPage />} />
          <Route path={ROUTES.SIGN_IN} element={SignInForm} />
          <Route path={ROUTES.SIGN_UP} element={SignUpForm} />
          <Route path={ROUTES.NEW_QUIZ} element={<NewQuizForm />} />
        </Routes></div>
      <NavFooter />
    </div>
  );
}

export default App;
