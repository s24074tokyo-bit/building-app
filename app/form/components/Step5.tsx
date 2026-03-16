import Field from "./ui/Field";
import Select from "./ui/Select";
import {
    sectionStyle,
    inputStyle,
    textareaStyle,
} from "./styles/formStyles";


export default function Step5({ form, update }: any) {
    return (
        <>
            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ⑨ 耐力壁の確認
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                {/* ■ 外周耐力壁の配置 */}
                <Field label="■ 外周耐力壁の配置">
                    <Select
                        value={form.wall?.layout ?? ""}
                        onChange={(v: string) => update("wall", "layout", v)}
                        options={[
                            "面材のみ",
                            "面材+筋かい",
                            "面材+片筋かい",
                            "筋かいのみ",
                        ]}
                    />
                </Field>

                {/* 筋かいのみ以外の場合のみ表示 */}
                {form.wall?.layout !== "筋かいのみ" && (
                    <>
                        {/* ■ 外周で使用する耐力面材 */}
                        <Field label="■ 外周で使用する耐力面材">
                            <Select
                                value={form.wall?.outer ?? ""}
                                onChange={(v: string) => update("wall", "outer", v)}
                                options={[
                                    "構造用合板（告示）",
                                    "構造用パーティクルボード（告示）",
                                    "構造用 MDF（告示）",
                                    "ノボパン STP",
                                    "ハイベストウッド",
                                    "スターウッド",
                                    "その他",
                                ]}
                            />
                        </Field>

                        {/* 外周 その他 */}
                        {form.wall?.outer === "その他" && (
                            <Field label="その他名称">
                                <input
                                    className={inputStyle}
                                    value={form.wall?.outerOther ?? ""}
                                    onChange={(e) =>
                                        update("wall", "outerOther", e.target.value)
                                    }
                                />
                            </Field>
                        )}

                        {/* ■ 内部で使用する耐力面材 */}
                        <Field label="■ 内部で使用する耐力面材">
                            <Select
                                value={form.wall?.inner ?? ""}
                                onChange={(v: string) => update("wall", "inner", v)}
                                options={[
                                    "使用しない（壁量を不足する場合を除く）",
                                    "構造用合板（告示）",
                                    "構造用パーティクルボード（告示）",
                                    "構造用 MDF（告示）",
                                    "ノボパン STP",
                                    "ハイベストウッド",
                                    "スターウッド",
                                    "その他",
                                ]}
                            />
                        </Field>

                        {/* 内部 その他 */}
                        {form.wall?.inner === "その他" && (
                            <Field label="その他名称">
                                <input
                                    className={inputStyle}
                                    value={form.wall?.innerOther ?? ""}
                                    onChange={(e) =>
                                        update("wall", "innerOther", e.target.value)
                                    }
                                />
                            </Field>
                        )}
                    </>
                )}

                {/* ■ その他伝達事項欄 */}
                <Field label="■ その他伝達事項欄">
                    <textarea
                        className={textareaStyle}
                        value={form.wall?.note ?? ""}
                        onChange={(e) =>
                            update("wall", "note", e.target.value)
                        }
                    />
                </Field>
            </div>


            {/* =========================================================
                ⑩ 納品・請求の確認
            ========================================================== */}

            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ⑩ 納品方法の確認
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                {/* ■ 納品方法 */}
                <Field label="■ 納品方法">
                    <Select
                        value={form.delivery?.method ?? ""}
                        onChange={(v: string) =>
                            update("delivery", "method", v)
                        }
                        options={[
                            "印刷納品",
                            "PDF納品",
                        ]}
                    />
                </Field>

                {/* ■ 送付先 */}

                {form.delivery?.method === "印刷納品"  &&
                <Field label="■ 送付先">
                    <input
                        className={inputStyle}
                        value={form.delivery?.destination ?? ""}
                        onChange={(e) =>
                            update("delivery", "destination", e.target.value)
                        }
                    />
                </Field>}

                {/* ■ 請求宛先 */}
                <Field label="■ 請求宛先">
                    <input
                        className={inputStyle}
                        value={form.delivery?.billingTo ?? ""}
                        onChange={(e) =>
                            update("delivery", "billingTo", e.target.value)
                        }
                    />
                </Field>

                {/* ■ 請求送付先 */}
                <Field label="■ 請求送付先">
                    <input
                        className={inputStyle}
                        value={form.delivery?.billingAddress ?? ""}
                        onChange={(e) =>
                            update("delivery", "billingAddress", e.target.value)
                        }
                    />
                </Field>
            </div>
        </>
    );
}