import { Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { loginUser, logoutUser } from "../utils/services/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    loginUser(email, password)
      .then(async (res) => {
        if (res?.data?.data?.occupation_level > 2) {
          await logoutUser();
          setErrorMsg("Untuk sementara, hanya bisa diakses oleh admin dan koordinator");
          setShowErrorMsg(true);
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Cek kembali email dan password Anda");
        setShowErrorMsg(true);
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
                <img style={{ width: "60px" }} src="/images/logo/icon-logo.png" alt="" />
                <img className="img-fluid light-logo" src="/images/logo/logo.png" alt="" />
              </a>
            </div>
          </div>
          {showErrorMsg && <div className="alert alert-danger">{errorMsg}</div>}
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
                  <input className="form-check-input" id="agree" type="checkbox" />
                  <label className="form-check-label" htmlFor="agree">
                    Ingat saya
                  </label>
                </div>
                <Link className="text-primary f-pwd" href="/ongoing">
                  Lupa password?
                </Link>
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
