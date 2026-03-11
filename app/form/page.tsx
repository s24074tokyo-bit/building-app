"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { FormDataType, initialForm } from "@/types/form";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Confirm from "./components/Confirm";
import AdminConfirm from "./components/AdminConfirm"

export default function StructureRequestPage() {
  const [step, setStep] = useState<number | null>(null);
  const [form, setForm] = useState<FormDataType>(initialForm);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    if (!id) {
      setStep(1);
      return
    }

    const fetchData = async () => {
      const docRef = doc(db, "structureRequests", id);
      const docSnap = await getDoc(docRef);
      const user = auth.currentUser;

      if (!user) return;

      const token = await user.getIdTokenResult();
      const adminFlag = token.claims.admin === true;
      setIsAdmin(adminFlag);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.userId !== user.uid && !adminFlag) {
          alert("権限がありません");
          router.push("/");
          return;
        }

        setForm(data as FormDataType);

        // 管理者は確認画面のみ
        if (adminFlag) {
          setStep(6);
        } else {
          setStep(1);
        }
      }
    };

    fetchData();
  }, [id, router]);

  const update = (section: string, key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateNested = (
    section: string,
    key: string,
    field: string,
    value: any
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: {
          ...prev[section][key],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) return;

    const docRef = await addDoc(collection(db, "structureRequests"), {
      ...form,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    router.push(`/form/complete?id=${docRef.id}`);
  };

  if (step === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        読み込み中...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-blue-50 p-8 flex flex-col">

      {/* ===== メインコンテンツ ===== */}

      <div className="flex-1 space-y-8">
        {step === 1 && <Step1 form={form} update={update} />}
        {step === 2 && <Step2 form={form} update={update} />}
        {step === 3 && <Step3 form={form} update={update} />}
        {step === 4 && (
          <Step4
            form={form}
            update={update}
            updateNested={updateNested}
          />
        )}
        {step === 5 && <Step5 form={form} update={update} />}
        {step === 6 && (
          isAdmin
            ?<AdminConfirm form ={form} isAdmin={isAdmin}/>
            :<Confirm form={form}/>
        )}
      </div>

      {/* ===== 下部ナビ（管理者は非表示） ===== */}
      {!isAdmin && (
        <div className="mt-auto pt-10 space-y-6">

          {/* Stepナビ */}
          <div className="flex justify-center gap-3 text-sm font-semibold">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => setStep(num)}
                className={`
                  w-9 h-9
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-200
                  ${step === num
                    ? "bg-blue-600 text-white shadow-md scale-110"
                    : "bg-gray-200 text-gray-600 hover:bg-blue-100"
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>

          {/* 戻る・次へ */}
          <div className="flex items-center justify-between">

            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl bg-white text-gray-700 border border-gray-300 shadow-sm hover:shadow-md transition-all"
              >
                ← 戻る
              </button>
            ) : (
              <div className="w-28" />
            )}

            {step >= 1 && step <= 4 && (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
              >
                次へ →
              </button>
            )}

            {step === 5 && (
              <button
                onClick={() => setStep(6)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
              >
                依頼書内容を確認
              </button>
            )}

            {step === 6 && (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white shadow-md"
              >
                送信を完了
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  );
}