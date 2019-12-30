import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import App from "next/app";

class MyApp extends App {
  componentDidMount() {
    fetch("/__/firebase/init.json").then(async response => {
      firebase.initializeApp(await response.json());

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          return user
            .getIdToken()
            .then(token => {
              // Create or update session cookie
              return fetch("/api/login", {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json" }),
                credentials: "same-origin",
                body: JSON.stringify({ token })
              });
            })
            .then(response => {
              return response.json();
            })
            .then(json => {
              if (json.needReload) {
                // If needReload flag is true, cookie's session token is expired but refresing session token from browser is success.
                // It means SSR rendering with expired session but user has a valid session.
                // In this case, do reload and use valid cookie's session token which is set from `/api/login` request.
                location.reload();
              }
            });
        } else {
          return fetch("/api/logout", {
            method: "POST",
            credentials: "same-origin"
          });
        }
      });
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
