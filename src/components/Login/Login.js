import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [isNewUser, setIsNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    isAuthorized: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const newUser = {
          isAuthorized: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(newUser);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isAuthorized: false,
          name: "",
          email: "",
          password: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleOnChange = (e) => {
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

  const doOnSuccess = (response) => {
    console.log(response);
    const newUser = { ...user };
    newUser.success = true;
    setUser(newUser);
  };

  const doOnError = (err) => {
    const newUser = { ...user };
    newUser.error = err.message;
    setUser(newUser);
  };

  const handleSubmit = (e) => {
    if (isNewUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          updateUserInfo();
          doOnSuccess(res);
        })
        .catch(function (error) {
          // Handle Errors here.
          doOnError(error);
          // ...
        });
    }

    if (!isNewUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          const newUser = { ...user };
          newUser.name = res.user.displayName;
          newUser.success = true;
          setUser(newUser);
          setLoggedInUser(newUser);
          history.push(from);
        })
        .catch(function (error) {
          // Handle Errors here.
          doOnError(error);
          // ...
        });
    }
    e.preventDefault();
  };

  const updateUserInfo = () => {
    const currentUser = firebase.auth().currentUser;

    currentUser
      .updateProfile({
        displayName: user.name,
      })
      .then((res) => {
        // Update successful.
        console.log(res);
      })
      .catch(function (error) {
        // An error happened.
        console.log("User Update failed");
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isAuthorized ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
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
            onBlur={handleOnChange}
            placeholder="Your Name"
            required
            type="text"
            name="name"
          />
        )}
        <br />
        <input
          onBlur={handleOnChange}
          required
          type="text"
          placeholder="Your email"
          name="email"
          id=""
        />
        <br />
        <input
          onBlur={handleOnChange}
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
