import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import firebase from "firebase/app";
import "firebase/auth";
import useFirebaseInitialized from "../hooks/useFirebaseInitialized";

const Login = () => {
  useFirebaseInitialized(() => {
    import("firebaseui").then(firebaseui => {
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", {
        signInSuccessUrl: "/",
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID
        ]
      });
    });
  });

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1 className="title">Login to Sample Next.js App!</h1>
        <p className="description">
          This is a sample Next.js app with Firebase Authentication. Please
          login.
        </p>

        <div className="login" id="firebaseui-auth-container"></div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .login {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
};

export default Login;
