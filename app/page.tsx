"use client"

import { useEffect, useState } from "react"
import {
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { StructureRequest } from "@/types/form"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Trash2, Heart } from "lucide-react";

export default function HomePage() {
  const [data, setData] = useState<StructureRequest[]>([])
  const [favorites, setFavorites] = useState<StructureRequest[]>([])
  const [others, setOthers] = useState<StructureRequest[]>([])

  const router = useRouter()

  // =========================
  // 削除
  // =========================
  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return
    await deleteDoc(doc(db, "structureRequests", id))
  }

  // =========================
  // ログアウト
  // =========================
  const handleLogout = async () => {
    if (!confirm("ログアウトしますか？")) return
    await signOut(auth)
    router.push("/login")
  }

  // =========================
  // お気に入り切替
  // =========================
  const toggleFavorite = async (item: StructureRequest) => {
    const ref = doc(db, "structureRequests", item.id)

    await updateDoc(ref, {
      mastered: !item.mastered
    })
  }

  // =========================
  // データ取得
  // =========================
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login")
        return
      }

      const q = query(
        collection(db, "structureRequests"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      )

      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StructureRequest[]

        setData(list)

        const fav = list.filter(item => item.mastered)
        const other = list.filter(item => !item.mastered)

        setFavorites(fav)
        setOthers(other)
      })
    })

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot()
      unsubscribeAuth()
    }
  }, [])

  return (
    <div className="min-h-screen bg-sky-100 p-12">

      {/* ===== ヘッダー ===== */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900">
          依頼書一覧
        </h1>

        <button
          onClick={() => router.push("/form")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          ＋ 新規作成
        </button>
      </div>

      {/* =========================
          📄 シート（ここが土台）
      ========================= */}
      <div className="max-w-5xl mx-auto">
        <div
          className="
            bg-white
            bg-[repeating-linear-gradient(to_bottom,transparent,transparent_32px,#c7dcff_33px)]
            bg-[length:80%_33px]
            bg-repeat-y
            bg-center
            rounded-3xl
            shadow-xl
            border border-blue-200
            p-12
            min-h-[400px]
          "
        >

          {/* =========================
              ❗ データ0件
          ========================= */}
          {data.length === 0 && (
            <div className="text-center mt-20">
              <div className="text-6xl mb-6">📝</div>

              <p className="text-lg font-semibold text-blue-900">
                まだ依頼書がありません
              </p>

              <p className="text-gray-500 mt-2 mb-6">
                「新規作成」ボタンから作成しましょう
              </p>
            </div>
          )}

          {/* =========================
              ⭐ お気に入り（データある時だけ）
          ========================= */}
          {data.length > 0 && (
            <>
              <div className="mb-10">
                <div className="bg-pink-200 border border-pink-200 rounded-2xl p-6">

                  <h2 className="text-pink-600 font-semibold mb-4">
                    ⭐ お気に入り(マスター用)
                  </h2>

                  {favorites.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      まだお気に入りがありません
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {favorites.map(item => (
                        <Card
                          key={item.id}
                          item={item}
                          router={router}
                          handleDelete={handleDelete}
                          toggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* =========================
                  📄 通常リスト
              ========================= */}
              <div className="space-y-6">
                {others.map(item => (
                  <Card
                    key={item.id}
                    item={item}
                    router={router}
                    handleDelete={handleDelete}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {/* ログアウト */}
      <button
        onClick={handleLogout}
        className="
          fixed bottom-8 right-8
          bg-red-500 hover:bg-red-600
          text-white px-6 py-3
          rounded-full shadow-lg
          transition
        "
      >
        ログアウト
      </button>
    </div>
  )
}

//////////////////////////////////////////////////////
// 🎨 カード
//////////////////////////////////////////////////////
function Card({ item, router, handleDelete, toggleFavorite }: any) {
  const created = item.createdAt?.toDate?.()

  return (
    <div
      className={`
        border-l-8 rounded-xl p-6
        transition-all duration-300
        hover:shadow-xl hover:scale-[1.02]
        cursor-pointer

        ${item.status === "completed"
          ? "bg-sky-200 border-sky-500"
          : item.status === "in_progress"
            ? "bg-sky-100 border-sky-300"
            : "bg-gray-50 border-gray-300"
        }
      `}
      onClick={() => router.push(`/form?id=${item.id}`)}
    >

      {/* 上段 */}
      <div className="flex items-center justify-between mb-3">

        {/* ゴミ箱 */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDelete(item.id)
          }}
          className="
      text-gray-400
      hover:text-red-500
      transition-all
      hover:scale-110
    "
        >
          <Trash2 size={18} />
        </button>

        {/* タイトル */}
        <div className="text-lg font-semibold text-blue-900 text-center flex-1 truncate">
          {item.customer.projectName}
        </div>

        {/* ハート */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(item)
          }}
          className="transition-all hover:scale-110"
        >
          <Heart
            size={20}
            className={`
        transition-all
        ${item.mastered
                ? "fill-pink-500 text-pink-500"
                : "text-pink-500"
              }
      `}
          />
        </button>

      </div>

      {/* 下段 */}
      <div className="flex items-center justify-between text-sm">

        {/* ステータス */}
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${item.status === "completed"
              ? "bg-sky-500 text-white"
              : "bg-gray-300 text-gray-700"
            }
          `}
        >
          {item.status === "completed" ? "完成" : "作成中"}
        </span>

        {/* 日付 */}
        <span className="text-gray-500">
          {created ? created.toLocaleString("ja-JP") : ""}
        </span>
      </div>

    </div>
  )
}