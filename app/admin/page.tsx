"use client"

import { useEffect, useState } from "react"
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { StructureRequest } from "@/types/form"
import { onAuthStateChanged } from "firebase/auth"
import { Trash2, LogOut } from "lucide-react"

export default function AdminHomePage() {
    const [data, setData] = useState<StructureRequest[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const handleDelete = async (id: string) => {
        if (!confirm("本当に削除しますか？")) return
        await deleteDoc(doc(db, "structureRequests", id))
    }

    const handleLogout = async () => {
        await auth.signOut()
        router.push("/login")
    }

    useEffect(() => {
        let unsubscribeSnapshot: (() => void) | null = null

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/login")
                return
            }

            // 🔐 adminチェック
            const token = await user.getIdTokenResult()

            if (!token.claims.admin) {
                router.push("/")
                return
            }

            // 👇 全件取得
            const q = query(
                collection(db, "structureRequests"),
                orderBy("createdAt", "desc")
            )

            unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as StructureRequest[]

                setData(list)
                setLoading(false)
            })
        })

        return () => {
            if (unsubscribeSnapshot) unsubscribeSnapshot()
            unsubscribeAuth()
        }
    }, [])
        return (
        <div className="min-h-screen bg-gray-100 p-10">

            {/* ヘッダー */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    管理者ダッシュボード
                </h1>
            </div>

            {/* 一覧テーブル */}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3 text-left">案件名</th>
                            <th className="p-3 text-left">お客様名</th>
                            <th className="p-3 text-left">作成日</th>
                            <th className="p-3 text-center">削除</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-16 text-gray-500">
                                    読み込み中...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={4}>
                                    <div className="py-20 flex flex-col items-center justify-center text-center">
                                        <div className="text-6xl mb-6 text-blue-300">📄</div>

                                        <p className="text-xl font-semibold text-blue-800">
                                            まだ依頼書が作成されていません
                                        </p>

                                        <p className="text-sm text-blue-500 mt-2">
                                            ユーザーが依頼書を作成するとここに表示されます
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => {
                                const created = item.createdAt?.toDate?.()

                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50 cursor-pointer"
                                        onClick={() => router.push(`/form?id=${item.id}`)}
                                    >
                                        <td className="p-3 font-medium text-gray-800">
                                            {item.customer.projectName}
                                        </td>

                                        <td className="p-3 text-gray-500">
                                            {item.customer.personInCharge}
                                        </td>

                                        <td className="p-3 text-gray-600">
                                            {created
                                                ? created.toLocaleString("ja-JP")
                                                : ""}
                                        </td>

                                        <td className="p-3 text-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDelete(item.id)
                                                }}
                                                className="text-gray-400 hover:text-red-500 transition"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* ログアウト */}
            <button
                onClick={handleLogout}
                className="
                fixed bottom-8 right-8
                bg-red-500 hover:bg-red-600
                text-white
                px-5 py-3
                rounded-full
                shadow-lg
                transition-all duration-300
                flex items-center gap-2
                "
            >
                <LogOut size={18} />
                ログアウト
            </button>
        </div>
    )
}
