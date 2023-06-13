/* eslint-disable react/no-unescaped-entities */
import { logoutUser } from "@/utils/services/auth";
import React from "react";

const NotfoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">403</h1>
        <p className="text-lg text-gray-400 mt-4">
          Oops! Kamu Tidak Memiliki Akses <br /> Silahkan Hubungi Admin Untuk Meminta Akses
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mt-8 rounded"
          onClickCapture={async () => await logoutUser()}
        >
          Ganti Akun
        </button>
      </div>
    </div>
  );
};

export default NotfoundPage;
