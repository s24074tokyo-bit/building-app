"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { auth } from "@/lib/firebase"


export default function CompletePage() {
  return (
    <Suspense>
      <CompleteContent />
    </Suspense>
  );
}

function CompleteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const status = searchParams.get("status");
  const message =
  status === "in_progress"
    ? "一時保存が完了しました"
    : status === "completed"
    ? "依頼書が送信されました"
    : "";

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdTokenResult();
      setIsAdmin(token.claims.admin === true);
    };

    checkAdmin();
  }, []);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white/80 backdrop-blur-md px-10 py-8 rounded-2xl shadow-sm border border-blue-100">
          <p className="text-red-500 font-medium tracking-wide">
            IDが見つかりません
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6
                    bg-gradient-to-br from-blue-50 via-white to-blue-100">

      <div className="
        w-full max-w-lg
        bg-white/90 backdrop-blur-md
        border border-blue-100
        rounded-3xl
        shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        p-12
      ">

        {/* アイコン */}
        <div className="flex justify-center mb-8">
          <div className="
            w-14 h-14
            rounded-full
            bg-blue-600/10
            flex items-center justify-center
          ">
            <svg
              className="w-7 h-7 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* タイトル */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-blue-700 tracking-tight">
          {message}
        </h1>



        {/* ボタン */}
        <div className="flex flex-col gap-4">

          <button
            onClick={() => router.push(isAdmin ? "/admin" : "/")}
            className="
    w-full
    py-3
    rounded-xl
    border border-blue-200
    text-blue-700
    bg-white
    font-medium
    transition-all duration-200
    hover:bg-blue-50
  "
          >
            {isAdmin ? "管理画面へ" : "ホームへ戻る"}
          </button>
        </div>
      </div>
    </div>
  );
}