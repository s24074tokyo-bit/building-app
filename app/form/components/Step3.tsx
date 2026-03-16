type Props = {
    form: any;
    update: (section: string, key: string, value: any) => void;
};

import Field from "./ui/Field";
import Select from "./ui/Select";
import {
    sectionStyle,
    inputStyle,
    textareaStyle,
} from "./styles/formStyles";

export default function Step3({ form, update }: any) {
    return (
        <>
            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ⑤ 設計条件
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                {/* ■ 工法 */}
                <Field label="■ 工法">
                    <Select
                        value={form.design?.method ?? ""}
                        onChange={(v: string) =>
                            update("design", "method", v)
                        }
                        options={[
                            "在来工法",
                            "金物工法",
                        ]}
                    />

                    {form.design?.method === "金物工法" && (
                        <input
                            className={inputStyle}
                            placeholder="金物名を入力"
                            value={form.design?.otherContent ?? ""}
                            onChange={(e) =>
                                update("design", "otherContent", e.target.value)
                            }
                        />
                    )}
                </Field>

                {/* ■ 耐震性能 */}
                <Field label="■ 耐震性能">
                    <Select
                        value={form.design?.seismicPerformance ?? ""}
                        onChange={(v: string) =>
                            update("design", "seismicPerformance", v)
                        }
                        options={[
                            "耐震等級1(基準法)",
                            "耐震等級2",
                            "耐震等級3",
                        ]}
                    />
                </Field>

                {/* ■ 耐風性能 */}
                <Field label="■ 耐風性能">
                    <Select
                        value={form.design?.windPerformance ?? ""}
                        onChange={(v: string) =>
                            update("design", "windPerformance", v)
                        }
                        options={[
                            "耐風等級1(基準法)",
                            "耐風等級2",
                        ]}
                    />
                </Field>

                <Field label="■ 基準風速">
                    <div className="flex items-center gap-2">
                        <input
                            className={inputStyle}
                            value={form.design?.baseWindSpeed ?? ""}
                            onChange={(e) =>
                                update("design", "baseWindSpeed", e.target.value)
                            }
                        />
                        <span className="text-blue-900">m/s</span>
                    </div>
                </Field>


                {/* ■ 積雪区分 */}
                <Field label="■ 積雪区分">
                    <div className="space-y-2">
                        <Select
                            value={form.design?.snowRegion ?? ""}
                            onChange={(v: string) =>
                                update("design", "snowRegion", v)
                            }
                            options={[
                                "一般地域",
                                "多雪地域",
                            ]}
                        />
                    </div>
                </Field>

                {/* ■ 積雪量 */}
                {form.design?.snowRegion === "多雪地域" && (
                    <>
                        {/* ■ 積雪量 */}
                        <Field label="■ 積雪量">
                            <div className="flex items-center gap-2">
                                <input
                                    className={inputStyle}
                                    value={form.design?.snowAmount ?? ""}
                                    onChange={(e) =>
                                        update("design", "snowAmount", e.target.value)
                                    }
                                />
                                <span className="text-blue-900">cm</span>
                            </div>
                        </Field>

                        {/* ■ 雪下ろしの適応 */}
                        <Field label="■ 雪下ろしの適応">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="snowRemovalApplicable"
                                        value="yes"
                                        checked={form.design?.snowRemovalApplicable === "yes"}
                                        onChange={(e) =>
                                            update("design", "snowRemovalApplicable", e.target.value)
                                        }
                                    />
                                    適応する
                                </label>

                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="snowRemovalApplicable"
                                        value="no"
                                        checked={form.design?.snowRemovalApplicable === "no"}
                                        onChange={(e) =>
                                            update("design", "snowRemovalApplicable", e.target.value)
                                        }
                                    />
                                    適応しない
                                </label>
                            </div>
                        </Field>

                        {/* ■ 雪下ろし後の積雪量 */}
                        {form.design?.snowRemovalApplicable === "yes" && (
                            <Field label="■ 雪下ろし後の積雪量">
                                <div className="flex items-center gap-2">
                                    <input
                                        className={inputStyle}
                                        value={form.design?.snowAmountAfterRemoval ?? ""}
                                        onChange={(e) =>
                                            update("design", "snowAmountAfterRemoval", e.target.value)
                                        }
                                    />
                                    <span className="text-blue-900">cm</span>
                                </div>
                            </Field>
                        )}
                    </>
                )}


                {/* ■ その他伝達事項欄 */}
                <Field label="■ その他伝達事項欄">
                    <textarea
                        className={textareaStyle}
                        value={form.design?.note ?? ""}
                        onChange={(e) =>
                            update("design", "note", e.target.value)
                        }
                    />
                </Field>
            </div>
            {/* =========================================================
                ⑥ 基礎条件
            ========================================================== */}

            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ⑥ 基礎条件
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                <Field label="■ 基礎条件が意匠図に記載されているか (未記載の場合、質問項目が表示されます)">
                    <Select
                        value={form.foundation?.did ?? ""}
                        onChange={(v: string) =>
                            update("foundation", "did", v)
                        }
                        options={[
                            "記載済み",
                            "未記載",
                        ]}
                    />
                </Field>

                {/* 未記載の場合のみ表示 */}
                {form.foundation?.did !== "記載済み" && (
                    <>
                        {/* ■ 基礎形状 */}
                        <Field label="■ 基礎形状">
                            <Select
                                value={form.foundation?.shape ?? ""}
                                onChange={(v: string) =>
                                    update("foundation", "shape", v)
                                }
                                options={[
                                    "べた基礎",
                                    "布基礎",
                                ]}
                            />
                        </Field>

                        {/* ■ 凍結震度の有無 */}
                        <Field label="■ 凍結震度の有無">
                            <div className="space-y-2">
                                <Select
                                    value={form.foundation?.frost ?? ""}
                                    onChange={(v: string) =>
                                        update("foundation", "frost", v)
                                    }
                                    options={[
                                        "有り",
                                        "無し",
                                    ]}
                                />

                                {/*{form.foundation?.frost === "有り" && (
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.foundation?.frostValue ?? ""}
                                            onChange={(e) =>
                                                update("foundation", "frostValue", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">cm</span>
                                    </div>
                                )}*/}
                            </div>
                        </Field>

                        {/* ■ 深基礎の有無 */}
                        <Field label="■ 深基礎の有無">
                            <div className="space-y-2">
                                <Select
                                    value={form.foundation?.deep ?? ""}
                                    onChange={(v: string) =>
                                        update("foundation", "deep", v)
                                    }
                                    options={[
                                        "有り",
                                        "無し",
                                    ]}
                                />

                                {/*{form.foundation?.deep === "有り" && (
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.foundation?.deepValue ?? ""}
                                            onChange={(e) =>
                                                update("foundation", "deepValue", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">cm</span>
                                    </div>
                                )}*/}
                            </div>
                        </Field>

                        {/* ■ 高基礎の有無 */}
                        <Field label="■ 高基礎の有無">
                            <div className="space-y-2">
                                <Select
                                    value={form.foundation?.high ?? ""}
                                    onChange={(v: string) =>
                                        update("foundation", "high", v)
                                    }
                                    options={[
                                        "有る",
                                        "無し",
                                    ]}
                                />

                                {form.foundation?.high === "有る" && (
                                    <div className="flex items-center gap-2">
                                        <input
                                            className={inputStyle}
                                            value={form.foundation?.highValue ?? ""}
                                            onChange={(e) =>
                                                update("foundation", "highValue", e.target.value)
                                            }
                                        />
                                        <span className="text-blue-900">cm</span>
                                    </div>
                                )}
                            </div>
                        </Field>

                        {/* ■ その他伝達事項欄 */}
                        <Field label="■ その他伝達事項欄">
                            <textarea
                                className={textareaStyle}
                                value={form.foundation?.note ?? ""}
                                onChange={(e) =>
                                    update("foundation", "note", e.target.value)
                                }
                            />
                        </Field>
                    </>
                )}

            </div>
        </>
    );
}