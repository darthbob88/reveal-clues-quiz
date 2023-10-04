import { firebaseAuth } from "../firebase";
import React, { useEffect, useState } from "react";
import firebase, { User } from "firebase";

const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string,
  userName: string
) =>
  firebaseAuth.createUserWithEmailAndPassword(email, password).then(result => {
    if (result.user == null) return false;
    result.user
      .updateProfile({
        displayName: userName
      })
      .catch(function (error) {
        console.log(error);
      });
  });

const doSignInWithEmailAndPassword = (email: string, password: string) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

const doSignOut = () => firebaseAuth.signOut();

const doPasswordReset = (email: string) =>
  firebaseAuth.sendPasswordResetEmail(email);

const doPasswordUpdate = (password: string) => {
  if (firebaseAuth.currentUser != null) {
    firebaseAuth.currentUser.updatePassword(password);
  } else {
    //TODO: If not logged in, throw an error?
  }
};

const doSignInWithGoogleOauth = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebaseAuth.useDeviceLanguage();
  firebase.auth().signInWithRedirect(provider);
}
const currentUser: (User | null) = firebase.auth().currentUser;
export const AuthService = {
  currentUser,
  doPasswordReset,
  doCreateUserWithEmailAndPassword,
  doPasswordUpdate,
  doSignInWithEmailAndPassword,
  doSignInWithGoogleOauth,
  doSignOut
};

export const AuthContext = React.createContext(AuthService);

type AuthProviderTypes = { children: React.ReactNode };
export const AuthProvider: React.FunctionComponent<AuthProviderTypes> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => setCurrentUser(user));
  });
  return (
    <AuthContext.Provider value={{ ...AuthService, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
