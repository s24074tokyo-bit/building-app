"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ResetPasswordPage(){

  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");

  const handleReset = async () => {

    try{

      await sendPasswordResetEmail(auth,email);

      setMessage("パスワードリセットメールを送信しました");

    }catch(error:any){

      setMessage("メール送信に失敗しました");

    }

  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      <div className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">

        <h1 className="text-2xl font-bold text-blue-700 text-center">
          パスワードリセット
        </h1>

        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          リセットメール送信
        </button>

        {message && (
          <p className="text-sm text-center text-gray-600">
            {message}
          </p>
        )}
        <p className="w-full text-blue-600 text-sm">
            ※ 迷惑メールとして受信される場合があります
        </p>

      </div>

    </div>
  );
}