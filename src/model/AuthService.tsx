import { firebaseAuth } from "../firebase";
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, User, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string,
  userName: string
) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password).then(result => {
    if (result.user == null) return false;
  }).catch(function (error) {
    console.log(error);
  });

const doSignInWithEmailAndPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(firebaseAuth, email, password);

const doSignOut = () => firebaseAuth.signOut();

const doPasswordReset = (email: string) =>
  sendPasswordResetEmail(firebaseAuth, email);

// const doPasswordUpdate = (password: string) => {
//   if (firebaseAuth.currentUser != null) {
//     firebaseAuth.currentUser.updatePassword(password);
//   } else {
//     //TODO: If not logged in, throw an error?
//   }
// };

const doSignInWithGoogleOauth = () => {
  var provider = new GoogleAuthProvider();
  firebaseAuth.useDeviceLanguage();
  signInWithPopup(firebaseAuth, provider).then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(user.displayName);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {

  });

}


const currentUser: (User | null) = firebaseAuth.currentUser;
export const AuthService = {
  currentUser,
  doPasswordReset,
  doCreateUserWithEmailAndPassword,
  // doPasswordUpdate,
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
