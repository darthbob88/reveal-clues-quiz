import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../routes";
import { AuthService } from "../../model/AuthService";


type NewUserState = {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: any;
};

const INITIAL_STATE: NewUserState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

//TODO: Turn this into a functional component, using hooks.
//TODO: Fix this prop typing
class SignUpForm extends Component<any, NewUserState> {
  constructor(props: any) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { username, email, passwordOne } = this.state;

    AuthService.doCreateUserWithEmailAndPassword(email, passwordOne, username)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error: any) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    //Ugly, but Typescript freaks out at the usual this.setState({[name]: value}) trick.
    switch (name) {
      case "username":
        this.setState({ username: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
      case "passwordOne":
        this.setState({ passwordOne: value });
        break;
      case "passwordTwo":
        this.setState({ passwordTwo: value });
        break;
      default:
        console.log("Something has gone wrong " + JSON.stringify(this.state));
        break;
    }
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit} className="SignUp">
        <h3>Sign Up</h3>
        <label>
          Username
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </label>
        <label>
          Password
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </label>
        <label>
          Confirm Password
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);


export { SignUpForm, SignUpLink };
