import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import fetch from "isomorphic-unfetch";

const User = ({ user }) => (
  <div>
    <Head>
      <title>User</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Your name is {user && (user.name || user.id)}</h1>
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

User.getInitialProps = async ({ req }) => {
  let origin =
    req && req.headers && req.headers.host
      ? "http://" + req.headers["x-forwarded-host"]
      : window.location.origin;
  const res = await fetch(`${origin}/api/user`, {
    headers: req && {
      cookie: req.headers.cookie
    }
  });
  if (!res.ok) {
    return {};
  }
  const json = await res.json();
  return { user: json.user };
};

export default User;
