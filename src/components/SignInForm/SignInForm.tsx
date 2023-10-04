import React, { useState, useContext } from "react";
import { AuthContext } from "../models/AuthService";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../routes";

export const SignInForm = () => {
  const AuthService = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSignInGoogle = () => {
    AuthService.doSignInWithGoogleOauth();
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    AuthService.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        if (authUser.user != null)
          console.log(`Successfully logged in as ${authUser.user.email}`);
        history.push(ROUTES.HOME);
      })
      .catch((error: any) => {});

    event.preventDefault();
  };
  const isInvalid = password === "" || email === "";
  return (
    //TODO: Extract some of this to separate forms for email/pw, OAuth, etc.
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <h3>Sign-in form</h3>
        <label>
          Email Address
          <input
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="text"
            placeholder="Email Address"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
      </form>
      {/*TODO: Get redirection working properly.*/}
      <p>
        <button onClick={onSignInGoogle}>Sign in with Google OAuth</button>
        <br />
        Note: You will have to manually click back to the home page. Sorry.
      </p>
    </React.Fragment>
  );
};
