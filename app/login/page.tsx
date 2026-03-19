"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {

    try {

      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      if (!user) {
        console.log("未ログイン");
        return;
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
        },
        { merge: true } // ←既存なら上書きしない
      );

      const tokenResult = await user.getIdTokenResult();

      if (tokenResult.claims.admin) {
        router.push("/admin");
      } else {
        router.push("/");
      }

    } catch (error: any) {
      setMessage(error.message);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      <div className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">

        <h1 className="text-2xl font-bold text-blue-700 text-center">
          ログイン
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
          <p className="text-red-500 text-sm text-center">
            {message}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ログイン
        </button>

        {/* パスワード忘れた */}
        <button
          onClick={() => router.push("/reset-password")}
          className="w-full text-blue-500 text-sm hover:underline"
        >
          パスワードを忘れた方
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="w-full text-blue-600 text-sm"
        >
          新規登録はこちら
        </button>

      </div>
    </div>
  );
}