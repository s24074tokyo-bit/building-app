"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h1 className="text-2xl font-bold text-green-700 text-center">
          新規登録
        </h1>

        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="パスワード"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}

        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          登録する
        </button>

        <button
          onClick={() => router.push("/login")}
          className="w-full text-green-600 text-sm"
        >
          ログインへ戻る
        </button>
      </div>
    </div>
  );
}