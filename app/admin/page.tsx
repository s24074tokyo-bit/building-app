"use client"

import { useEffect, useState } from "react"
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, snapshotEqual } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { StructureRequest } from "@/types/form"
import { onAuthStateChanged } from "firebase/auth"
import { Trash2, LogOut } from "lucide-react"

export default function AdminHomePage() {
    const [data, setData] = useState<StructureRequest[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [users, setUsers] = useState<{ uid: string; email: string }[]>([]);
    const [selectedUser, setSelectedUser] = useState("");

    const handleDelete = async (id: string) => {
        if (!confirm("本当に削除しますか？")) return
        await deleteDoc(doc(db, "structureRequests", id))
    }

    const handleLogout = async () => {
        await auth.signOut()
        router.push("/login")
    }

    useEffect(() => {
        let unsubscribeSnapshot: (() => void) | null = null;
        let unsubscribeUsers: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            // 🔥 先に全部解除
            if (unsubscribeSnapshot) unsubscribeSnapshot();
            if (unsubscribeUsers) unsubscribeUsers();

            if (!user) {
                router.push("/login");
                return;
            }

            const token = await user.getIdTokenResult();

            if (!token.claims.admin) {
                router.push("/");
                return;
            }

            // =========================
            // snapshot再登録
            // =========================
            const q = query(
                collection(db, "structureRequests"),
                orderBy("createdAt", "desc")
            );

            unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as StructureRequest[];

                setData(list);
                setLoading(false);
            });

            const qUsers = query(collection(db, "users"));

            unsubscribeUsers = onSnapshot(qUsers, (snapshot) => {
                const list = snapshot.docs.map(doc => ({
                    uid: doc.id,
                    email: doc.data().email
                }));

                setUsers(list);
            });
        });

        return () => {
            if (unsubscribeSnapshot) unsubscribeSnapshot();
            if (unsubscribeUsers) unsubscribeUsers(); // ← これ重要🔥
            unsubscribeAuth();
        };
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 p-10">

            {/* ヘッダー */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    管理者ダッシュボード
                </h1>
            </div>

            <div className="max-w-6xl mx-auto mb-6 flex gap-4 items-center">
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">ユーザー選択</option>
                    {users.map((u) => (
                        <option key={u.uid} value={u.uid}>
                            {u.email}
                        </option>
                    ))}
                </select>

                <button
                    disabled={!selectedUser}
                    onClick={() => {
                        router.push(`/form?targetUserId=${selectedUser}`);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    このユーザーで依頼作成
                </button>
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
