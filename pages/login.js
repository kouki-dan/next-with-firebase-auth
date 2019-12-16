import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const Login = () => (
  <div>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Login to Sample Next.js App!</h1>
      <p className="description">
          This is a sample Next.js app with Firebase Authentication. Please login.
      </p>

      <div className="login">
          TODO: Login Page
      </div>
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
)

export default Login
