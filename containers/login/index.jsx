// import { loginUser, logoutUser } from "@/utils/services/auth";
import { Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // loginUser(email, password)
    //   .then(async (res) => {
    //     if (res?.data?.data?.occupation_level > 2) {
    //       await logoutUser();
    //       setErrorMsg("Untuk sementara, hanya bisa diakses oleh admin dan koordinator");
    //       setShowErrorMsg(true);
    //     } else {
    //       window.location.replace("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setErrorMsg("Cek kembali email dan password Anda");
    //     setShowErrorMsg(true);
    //   });
    // Hardcode credentials
    const validUsername = "admin";
    const validPassword = "admin";

    // Check hardcoded credentials
    if (email === validUsername && password === validPassword) {
      // Set a simple token in localStorage to simulate authentication
      localStorage.setItem("auth_token", "valid_user_logged_in");
      // Redirect to patroli page
      window.location.replace("/");
    } else {
      setErrorMsg("Username atau password salah. Gunakan: admin / admin");
      setShowErrorMsg(true);
    }
  };

  return (
    <>
      <Head>
        <title>Login · Chakra</title>
      </Head>
      <div className="flex w-screen h-screen">
        <div className="flex flex-[2] h-full w-full bg-primary relative justify-center">
          <img src="/images/logo-black.svg" alt="" className="w-[330px] mb-20 " />
          <img src="/images/login.svg" alt="" className="bottom-0 absolute right-0 w-full" />
        </div>
        <div className="flex flex-[3] items-center justify-center">
          <div className="codex-authbox w-[365px] flex flex-col gap-2">
            {/* Demo credentials info */}
            {/* <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <div className="text-sm text-blue-800 font-semibold mb-1">Demo Login:</div>
              <div className="text-xs text-blue-600">
                Username: <strong>admin</strong>
              </div>
              <div className="text-xs text-blue-600">
                Password: <strong>password123</strong>
              </div>
            </div> */}

            {showErrorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <div className="form-group flex flex-col gap-1">
                <label className="form-label text text-sm font-semibold">Username</label>
                {/* <Input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                  placeholder="Masukkan username"
                  className="border-[1px] rounded-md border-black "
                /> */}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  required
                  placeholder="Masukkan username"
                  className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
              <div className="form-group flex flex-col gap-1">
                <label className="form-label text text-sm font-semibold" htmlFor="Password">
                  Password
                </label>
                {/* <Input.Password
                  name="password"
                  required
                  placeholder="Masukkan password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[1px] rounded-md border-black "
                /> */}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder="Masukkan username"
                  required
                  className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
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
                <button className="w-full bg-primary text-white py-3 rounded-md mt-12" type="submit">
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
