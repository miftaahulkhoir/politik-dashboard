import { resetPassword } from "@/utils/services/auth";
import { Input, message } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ConfirmPassword() {
  const router = useRouter();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      message.error("Pastikan password yang anda masukan sama!");
    }
    const res = await resetPassword(router.query, password);
    if (res.status === 200) {
      message.success("Reset password berhasil, silahkan login untuk melanjutkan.");
      router.push("/login");
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Confirm Password · Chakra</title>
      </Head>
      <div className="flex w-screen h-screen">
        <div className="flex flex-[3] items-center justify-center">
          <div className="codex-authbox w-[365px] flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <div className="text-xl font-bold">Permintaan Ganti Password</div>
              <div className="text-sm font-semibold text-gray-300"> Masukkan password baru anda</div>
            </div>
            <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
              <div className="form-group flex flex-col gap-1">
                <label className="form-label text text-sm font-semibold">Password</label>
                <Input.Password
                  onChange={(e) => setPassword(e.target.value)}
                  name="email"
                  type="password"
                  required
                  className="border-[1px] rounded-md border-black"
                />
              </div>
              <div className="form-group flex flex-col gap-1 mt-3">
                <label className="form-label text text-sm font-semibold">Konfirmasi Password</label>
                <Input.Password
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  name="email"
                  required
                  className="border-[1px] rounded-md border-black"
                />
              </div>

              <div className="form-group flex flex-col gap-1 items-center">
                <button className="w-full bg-red-500 text-white py-3 rounded-md mt-6" type="submit">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
