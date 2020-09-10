import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handleSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./loginManager";

import { useHistory, useLocation } from "react-router-dom";

initializeLoginFramework();

function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  ///Pointer
  const [user, setUser] = useState({
    isAuthorized: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  const handleBlur = (e) => {
    let isValid = true;
    if (e.target.name === "email") {
      isValid = /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/.test(
        e.target.value
      );
    }
    if (e.target.name === "password") {
      isValid = /^([a-zA-Z0-9@*#]{8,15})$/.test(e.target.value);
    }
    if (isValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };

  const handleSubmit = (e) => {
    if (isNewUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!isNewUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  const handleResponse = (res, shouldRedirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (shouldRedirect) {
      history.replace(from);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isAuthorized ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
      {user.isAuthorized && (
        <div>
          <h3>Welcome {user.name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>our own authentication system</h1>
      <input
        onChange={() => setIsNewUser(!isNewUser)}
        type="checkbox"
        name="isNewUser"
        id=""
      />
      <label htmlFor="isNewUser">New User?</label>
      <form action="">
        {isNewUser && (
          <input
            onBlur={handleBlur}
            placeholder="Your Name"
            required
            type="text"
            name="name"
          />
        )}
        <br />
        <input
          onBlur={handleBlur}
          required
          type="text"
          placeholder="Your email"
          name="email"
          id=""
        />
        <br />
        <input
          onBlur={handleBlur}
          required
          type="password"
          placeholder="Your password"
          name="password"
          id=""
        />
        <br />
        <input
          onClick={handleSubmit}
          type="submit"
          value={isNewUser ? "Sign Up" : "Sign In"}
        />
      </form>
      {user.success ? (
        <p style={{ color: "green" }}>
          User {isNewUser ? "Created" : "Logged In"} Successfully
        </p>
      ) : (
        <p style={{ color: "red" }}>{user.error}</p>
      )}
    </div>
  );
}

export default Login;
