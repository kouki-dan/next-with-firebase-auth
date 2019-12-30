import React from "react";
import Head from "next/head";
import Nav from "../components/nav";

const User = () => (
  <div>
    <Head>
      <title>User</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Your name is [Your Name]</h1>
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

export default User;
