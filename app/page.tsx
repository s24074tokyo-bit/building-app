"use client"

import { useEffect, useState } from "react"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { StructureRequest } from "@/types/form"
import { deleteDoc, doc } from "firebase/firestore"
import { Trash2, LogOut } from "lucide-react"
import { onSnapshot } from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth"

export default function HomePage() {
  const [data, setData] = useState<StructureRequest[]>([])
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return

    await deleteDoc(doc(db, "structureRequests", id))

    setData(prev => prev.filter(item => item.id !== id))
  }

  const handleLogout = async () => {
    if (!confirm("ログアウトを完了します")) return
    await signOut(auth);
    router.push("/login");
  }

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
        router.push("/login");
        return;
      }

      const q = query(
        collection(db, "structureRequests"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StructureRequest[];

        setData(list);
      }
      ,(error) => {
        if(error.code === "permission-denied") return;
        console.error(error);
      }
    );
    });

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      unsubscribeAuth();
    };
  }, []);


  return (
    <div className="min-h-screen bg-sky-100 p-12">

      {/* ヘッダー */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 tracking-tight">
          依頼書一覧
        </h1>

        <button
          onClick={() => router.push("/form")}
          className="
          bg-blue-600
          hover:bg-blue-700
          transition-all duration-200
          text-white px-6 py-3 rounded-xl shadow-md
          hover:shadow-lg hover:-translate-y-0.5
          "
        >
          ＋ 新規作成
        </button>
      </div>

      {/* レポート用紙風 親カード */}
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

          {/* データがない場合 */}
          {data.length === 0 && (
            <div className="text-center mt-20">
              <div className="text-6xl mb-6">📝</div>
              <p className="text-lg font-semibold text-blue-900">
                まだ依頼書がありません
              </p>
              <p className="text-gray-500 mt-2">
                「新規作成」ボタンから作成してください
              </p>
            </div>
          )}

          {/* カード一覧 */}
          <div className="space-y-8">
            {data.map((item) => {
              const created = item.createdAt?.toDate?.()

              /*
              const updated = item.updatedAt?.toDate?.()

              const isUpdated =
                created && updated
                  ? created.getTime() !== updated.getTime()
                  : false

              const displayDate = updated || created
              */

              return (
                <div
                  key={item.id}
                  className="
                  bg-gray-50
                  backdrop-blur-sm
                  border-l-8 border-blue-500
                  rounded-xl
                  p-8
                  transition-all duration-300
                  hover:shadow-2xl
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  hover:border-purple-600
                  cursor-pointer
                  "
                  onClick={() => router.push(`/form?id=${item.id}`)}
                >
                  <div className="flex justify-between items-center">

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(item.id)
                      }}
                      className="
                     p-2
                     rounded-lg
                     text-gray-400
                     hover:text-red-500
                     hover:bg-red-50
                     hover:scale-110
                     transition-all duration-200
                     "
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="text-xl font-semibold text-blue-900">
                      {item.customer.projectName}
                    </div>

                    <div className="text-sm text-blue-700">
                      作成日 :
                      {created
                        ? created.toLocaleString("ja-JP")
                        : ""}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={handleLogout}
            className="
            fixed bottom-8 right-8
            bg-red-500
            hover:bg-red-600
            active:scale-95
            text-white
            px-6 py-3
            rounded-full
            shadow-lg
            hover:shadow-2xl
            transition-all duration-300
            flex items-center gap-2
            font-semibold
            "
          >
            <LogOut size={18} />
            ログアウト
          </button>

        </div>
      </div>

    </div>
  )
}