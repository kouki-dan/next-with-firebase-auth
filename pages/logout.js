import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import firebase from "firebase/app";
import "firebase/auth";
import useFirebaseInitialized from "../hooks/useFirebaseInitialized";

const Logout = () => {
  useFirebaseInitialized(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        return fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin"
        });
      })
      .then(() => {
        location.href = "/";
      });
  });

  return (
    <div>
      <Head>
        <title>Logout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1 className="title">Logout</h1>
        <p className="description">Processing...</p>
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
      `}</style>
    </div>
  );
};

export default Logout;
