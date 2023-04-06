import { loginUser, logoutUser } from "@/utils/services/auth";
import { Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
      <div className="flex w-screen h-screen">
        <div className="flex flex-[2] h-full w-full bg-red-500 relative">
          <img src="/images/logo-white.svg" alt="" className="bottom-0 absolute top-8 left-8 " />
          <img src="/images/login.svg" alt="" className="bottom-0 absolute right-0 w-full" />
        </div>
        <div className="flex flex-[3] items-center justify-center">
          <div className="codex-authbox w-[365px] flex flex-col gap-2">
            {showErrorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <div className="form-group flex flex-col gap-1">
                <label className="form-label text text-sm font-semibold">NRP</label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                  className="border-[1px] rounded-md border-black"
                />
              </div>
              <div className="form-group flex flex-col gap-1">
                <label className="form-label text text-sm font-semibold" htmlFor="Password">
                  Password
                </label>
                <Input.Password
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[1px] rounded-md border-black"
                />
              </div>
              <div className="form-group flex flex-col gap-1 mb-0">
                <div className="auth-remember">
                  <div className="form-check custom-chek flex items-center gap-3">
                    <input className="form-check-input" id="agree" type="checkbox" />
                    <label className="form-check-label text-sm" htmlFor="agree">
                      Ingat saya
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group flex flex-col gap-1 items-center">
                <button className="w-full bg-red-500 text-white py-3 rounded-md mt-12" type="submit">
                  <i className="fa fa-sign-in"></i> Login
                </button>
                <Link className="text-gray-500  font-semibold text-sm mt-12" href="/forgot-password">
                  Lupa password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
