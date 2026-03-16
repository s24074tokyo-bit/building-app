import Field from "./ui/Field";
import Select from "./ui/Select";
import {
    sectionStyle,
    inputStyle,
    textareaStyle,
} from "./styles/formStyles";


export default function Step2({ form, update }: any) {
    return (
        <>
            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ③ 建物情報その１
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                {/* ■ 構造種別 */}
                <Field label="■ 構造種別">
                    <Select
                        value={form.building1?.structureType ?? ""}
                        onChange={(v: string) =>
                            update("building1", "structureType", v)
                        }
                        options={[
                            "木造",
                            "混構造(木造+WRC)",
                        ]}
                    />
                </Field>

                {/* ■ 階数 */}
                <Field label="■ 階数">
                    <Select
                        value={form.building1?.floorCount ?? ""}
                        onChange={(v: string) =>
                            update("building1", "floorCount", v)
                        }
                        options={[
                            "1階",
                            "2階",
                            "3階",
                        ]}
                    />
                </Field>

                {/* ■ ペントハウスの有無 */}
                <Field label="■ ペントハウスの有無">
                    <Select
                        value={form.building1?.penthouse ?? ""}
                        onChange={(v: string) =>
                            update("building1", "penthouse", v)
                        }
                        options={[
                            "有る",
                            "無し",
                        ]}
                    />
                </Field>

                {/* ■ 用途 */}
                <Field label="■ 用途">
                    <input
                        className={inputStyle}
                        value={form.building1?.usage ?? ""}
                        onChange={(e) =>
                            update("building1", "usage", e.target.value)
                        }
                    />
                </Field>

                {/* ■ 耐火要件 */}
                <Field label="■ 耐火要件">
                    <Select
                        value={form.building1?.fireRequirement ?? ""}
                        onChange={(v: string) =>
                            update("building1", "fireRequirement", v)
                        }
                        options={[
                            "耐火構造",
                            "準耐火構造",
                            "該当なし",
                        ]}
                    />
                </Field>

                {/* ■ その他伝達事項欄 */}
                <Field label="■ その他伝達事項欄">
                    <textarea
                        className={textareaStyle}
                        value={form.building1?.note ?? ""}
                        onChange={(e) =>
                            update("building1", "note", e.target.value)
                        }
                    />
                </Field>
            </div>
            {/* =========================================================
                ④ 建物情報
            ========================================================== */}

            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ④ 建物情報その２
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                <Field label="■ 意匠図に記載されているか">
                    <Select
                        value={form.building2?.did ?? ""}
                        onChange={(v: string) =>
                            update("building2", "did", v)
                        }
                        options={[
                            "記載済み",
                            "未記載",
                        ]}
                    />

                    {form.building2?.did !== "記載済み" && (
                        <>
                            <h3 className="text-base font-semibold text-blue-700 border-b border-blue-200 pb-1 mt-4">
                                ■ 構造高さ情報
                            </h3>
                            <Field label="■ 平均GL〜設計GL">
                                <div className="flex items-center gap-2">
                                    <input
                                        className={inputStyle}
                                        value={form.building2?.glToDesign ?? ""}
                                        onChange={(e) =>
                                            update("building2", "glToDesign", e.target.value)
                                        }
                                    />
                                    <span className="text-blue-900">mm</span>
                                </div>
                            </Field>

                            {/* ■ 設計GL〜基礎天 */}
                            <Field label="■ 設計GL〜基礎天">
                                <div className="flex items-center gap-2">
                                    <input
                                        className={inputStyle}
                                        value={form.building2?.designToFoundation ?? ""}
                                        onChange={(e) =>
                                            update("building2", "designToFoundation", e.target.value)
                                        }
                                    />
                                    <span className="text-blue-900">mm</span>
                                </div>
                            </Field>

                            {/* ■ 基礎天〜土台天 */}
                            <Field label="■ 基礎天〜土台天">
                                <div className="flex items-center gap-2">
                                    <input
                                        className={inputStyle}
                                        value={form.building2?.foundationToBase ?? ""}
                                        onChange={(e) =>
                                            update("building2", "foundationToBase", e.target.value)
                                        }
                                    />
                                    <span className="text-blue-900">mm</span>
                                </div>
                            </Field>

                            {/* ■ 土台天〜2階梁天 */}
                            <Field label="■ 土台天〜2階梁天">
                                <div className="flex items-center gap-2">
                                    <input
                                        className={inputStyle}
                                        value={form.building2?.baseToSecondBeam ?? ""}
                                        onChange={(e) =>
                                            update("building2", "baseToSecondBeam", e.target.value)
                                        }
                                    />
                                    <span className="text-blue-900">mm</span>
                                </div>
                            </Field>

                            {/* ■ 2階梁天〜3階梁天 */}
                            {form.building1?.floorCount === "3階" && (
                                <Field label="■ 2階梁天〜3階梁天">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.building2?.secondToThirdBeam ?? ""}
                                            onChange={(e) =>
                                                update("building2", "secondToThirdBeam", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">mm</span>
                                    </div>
                                </Field>
                            )}

                            {/* ■ 1階梁天〜小屋梁天 */}
                            {form.building1?.floorCount === "1階" && (
                                <Field label="■ 1階梁天〜小屋梁天">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.building2?.firstToRoofBeam ?? ""}
                                            onChange={(e) =>
                                                update("building2", "firstToRoofBeam", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">mm</span>
                                    </div>
                                </Field>
                            )}

                            {/* ■ 2階梁天〜小屋梁天 */}
                            {form.building1?.floorCount === "2階" && (
                                <Field label="■ 2階梁天〜小屋梁天">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.building2?.secondToRoofBeam ?? ""}
                                            onChange={(e) =>
                                                update("building2", "secondToRoofBeam", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">mm</span>
                                    </div>
                                </Field>
                            )}

                            {/* ■ 3階梁天〜小屋梁天 */}
                            {form.building1?.floorCount === "3階" && (
                                <Field label="■ 3階梁天〜小屋梁天">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.building2?.thirdToRoofBeam ?? ""}
                                            onChange={(e) =>
                                                update("building2", "thirdToRoofBeam", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">mm</span>
                                    </div>
                                </Field>
                            )}

                            {/* ■ 1階床厚 */}
                            <h3 className="text-base font-semibold text-blue-700 border-b border-blue-200 pb-1 mt-6">
                                ■ 床厚情報
                            </h3>
                            <Field label="■ 1階床厚">
                                <div className="flex items-center gap-2">
                                    <input
                                        className={inputStyle}
                                        value={form.building2?.firstFloorThickness ?? ""}
                                        onChange={(e) =>
                                            update("building2", "firstFloorThickness", e.target.value)
                                        }
                                    />
                                    <span className="text-blue-900">mm</span>
                                </div>
                            </Field>

                            {/* ■ 2階床厚 */}
                            {form.building1?.floorCount !== "1階" && (
                                <Field label="■ 2階床厚">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.building2?.secondFloorThickness ?? ""}
                                            onChange={(e) =>
                                                update("building2", "secondFloorThickness", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">mm</span>
                                    </div>
                                </Field>
                            )}

                            {/* ■ 3階床厚 */}
                            {form.building1?.floorCount === "3階" && (
                                <Field label="■ 3階床厚">
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.building2?.thirdFloorThickness ?? ""}
                                            onChange={(e) =>
                                                update("building2", "thirdFloorThickness", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">mm</span>
                                    </div>
                                </Field>
                            )}

                            {/* ■ その他伝達事項欄 */}
                            <Field label="■ その他伝達事項欄　(建物情報その２について)">
                                <textarea
                                    className={textareaStyle}
                                    value={form.building2?.note ?? ""}
                                    onChange={(e) =>
                                        update("building2", "note", e.target.value)
                                    }
                                />
                            </Field>
                        </>
                    )}
                </Field>

                {/* ■ 平均GL〜設計GL */}

            </div>
        </>
    );
}