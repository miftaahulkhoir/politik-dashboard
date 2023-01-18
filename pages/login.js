import { Input } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Login({ pageProps }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.APP_BASEURL}api/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        router.push('/');
      })
      .catch((err) => {
        setErrorMsg(true);
      });
  };
  return (
    <>
      <Head>
        <title>Login · Patrons</title>
      </Head>
      <div className="auth-main">
        <div className="codex-authbox">
          <div className="auth-header">
            <div className="codex-brand">
              <a>
                <img
                  style={{ width: '60px' }}
                  src={`${process.env.APP_BASEURL}images/logo/icon-logo.png`}
                  alt=""
                />
                <img
                  className="img-fluid light-logo"
                  src={`${process.env.APP_BASEURL}images/logo/logo.png`}
                  alt=""
                />
              </a>
            </div>
          </div>
          {errorMsg && (
            <div className="alert alert-danger">
              Please check your Email and Password
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
                placeholder="Masukkan Email Anda"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="Password">
                Password
              </label>
              <Input.Password
                placeholder="Masukkan Password Anda"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-0">
              <div className="auth-remember">
                <div className="form-check custom-chek">
                  <input
                    className="form-check-input"
                    id="agree"
                    type="checkbox"
                    value=""
                    required=""
                  />
                  <label className="form-check-label" htmlFor="agree">
                    Ingat saya
                  </label>
                </div>
                <a className="text-primary f-pwd" href="/ongoing">
                  Lupa password?
                </a>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                <i className="fa fa-sign-in"></i> Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
