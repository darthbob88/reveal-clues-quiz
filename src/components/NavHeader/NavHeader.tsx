import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

export const NavHeader = () => {

  return (
    <header>
      <h1>Raymond's Quiz App</h1>
      <Link to={ROUTES.HOME}>Home</Link>
    </header>
  );

};
