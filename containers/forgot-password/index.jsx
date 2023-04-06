import { Input } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasword() {
  const [email, setEmail] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("called", email);
  };

  return (
    <>
      <Head>
        <title>Forgot Password · Patrons</title>
      </Head>
      <div className="flex w-screen h-screen">
        <div className="flex flex-[3] items-center justify-center">
          <div className="codex-authbox w-[365px] flex flex-col gap-5">
            {showErrorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <div className="flex flex-col gap-1">
              <div className="text-xl font-bold">Permintaan Ganti Password</div>
              <div className="text-sm font-semibold text-gray-300"> Masukkan email akun anda Email</div>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <div className="form-group flex flex-col gap-1">
                <label className="form-label text text-sm font-semibold">Email</label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                  className="border-[1px] rounded-md border-black"
                />
              </div>
              <div className="text-sm text-gray-400 w-fit mx-auto">
                Punya akun?{" "}
                <Link className="text-red-primary inline-block text-sm mt-6" href="/login">
                  Login
                </Link>
              </div>
              <div className="form-group flex flex-col gap-1 items-center">
                <button className="w-full bg-red-500 text-white py-3 rounded-md mt-6" type="submit">
                  Kirim Permintaan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
