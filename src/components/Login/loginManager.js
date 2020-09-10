import "firebase/auth";
import * as firebase from "firebase/app";
import firebaseConfig from "../../firebase.config";

export const initializeLoginFramework = () => {
  if (firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
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
      return newUser;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const handleSignOut = () => {
  return firebase
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
      return signedOutUser;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      const newUser = res.user;
      newUser.success = true;
      newUser.isAuthorized = true;
      return newUser;
    })
    .catch(function (error) {
      // Handle Errors here.
      const newUser = {};
      newUser.error = error.message;
      // ...
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      updateUserInfo(name);
      const newUser = res.user;
      newUser.success = true;
      newUser.isAuthorized = true;
      return newUser;
    })
    .catch(function (error) {
      // Handle Errors here.
      const newUser = {};
      newUser.error = error.message;
      // ...
    });
};

const updateUserInfo = (name) => {
  const currentUser = firebase.auth().currentUser;

  currentUser
    .updateProfile({
      displayName: name,
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
