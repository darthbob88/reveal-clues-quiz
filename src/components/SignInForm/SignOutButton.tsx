import React, { useContext } from "react";
import { AuthContext} from "../models/AuthService";
export const SignOutButton = () => {
  
  const AuthService = useContext(AuthContext);
  const signOut = () => {
    AuthService.doSignOut().then(() => {
        console.log(`Successfully signed out`)
    });
  };
  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
};
