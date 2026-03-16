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


export default function Step1({ form, update }: Props) {
    return (
        <>
        <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ① お客様情報の確認
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                {/* ■ 依頼会社様名 */}
                <Field label="■ 依頼会社様名">
                    <input
                        className={inputStyle}
                        value={form.customer?.companyName ?? ""}
                        onChange={(e) =>
                            update("customer", "companyName", e.target.value)
                        }
                    />
                </Field>

                {/* ■ 物件名 */}
                <Field label="■ 物件名">
                    <input
                        className={inputStyle}
                        value={form.customer?.projectName ?? ""}
                        onChange={(e) =>
                            update("customer", "projectName", e.target.value)
                        }
                    />
                </Field>

                {/* ■ 担当者様名 */}
                <Field label="■ 担当者様名">
                    <input
                        className={inputStyle}
                        value={form.customer?.personInCharge ?? ""}
                        onChange={(e) =>
                            update("customer", "personInCharge", e.target.value)
                        }
                    />
                </Field>

                {/* ■ 依頼会社と異なる場合の会社名 
                
                <Field label="■ 依頼会社と異なる場合の会社名">
                    <div className="space-y-2">
                        <input
                            className={inputStyle}
                            value={form.customer?.differentCompany ?? ""}
                            onChange={(e) =>
                                update("customer", "differentCompany", e.target.value)
                            }
                        />
                        <div className="text-xs text-blue-700">
                            ※「異なる場合のみ記載」
                        </div>
                    </div>
                </Field>
                */}

                {/* ■ 電話番号 */}
                <Field label="■ 電話番号">
                    <div className="space-y-2">
                        <input
                            className={inputStyle}
                            value={form.customer?.phone ?? ""}
                            onChange={(e) =>
                                update("customer", "phone", e.target.value)
                            }
                        />
                        <div className="text-xs text-blue-700">
                            ※「連絡が取れる番号を記載ください。」
                        </div>
                    </div>
                </Field>

                {/* ■ その他伝達事項欄 */}
                <Field label="■ その他伝達事項欄">
                    <textarea
                        className={textareaStyle}
                        value={form.customer?.note ?? ""}
                        onChange={(e) =>
                            update("customer", "note", e.target.value)
                        }
                    />
                </Field>
            </div>
            {/* =========================================================
                ② 申請情報
            ========================================================== */}

            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ② 申請情報
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                {/* ■ 申請予定日 */}
                <Field label="■ 申請予定日">
                    <div className="space-y-2">
                        <input
                            type="date"
                            className={inputStyle}
                            value={form.application?.plannedDate ?? ""}
                            onChange={(e) =>
                                update("application", "plannedDate", e.target.value)
                            }
                        />

                        {form.application?.plannedDate && (() => {
                            const today = new Date();
                            const planned = new Date(form.application.plannedDate);
                            const diff = (planned.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

                            if (diff < 21) {
                                return (
                                    <div className="text-red-600 text-sm font-semibold">
                                        ※記載日から3週間確保出来ていません
                                    </div>
                                );
                            }
                            return null;
                        })()}
                    </div>
                </Field>

                {/* ■ 申請先 */}
                <Field label="■ 申請先">
                    <input
                        className={inputStyle}
                        value={form.application?.destination ?? ""}
                        onChange={(e) =>
                            update("application", "destination", e.target.value)
                        }
                    />
                </Field>

                {/* ■ 申請内容 */}
                <Field label="■ 申請内容">
                    <div className="space-y-2">
                        <Select
                            value={form.application?.content ?? ""}
                            onChange={(v: string) =>
                                update("application", "content", v)
                            }
                            options={[
                                "確認申請",
                                "性能評価",
                                "確認申請+性能評価",
                                "その他",
                            ]}
                        />

                        {form.application?.content === "その他" && (
                            <input
                                className={inputStyle}
                                placeholder="内容を記載"
                                value={form.application?.otherContent ?? ""}
                                onChange={(e) =>
                                    update("application", "otherContent", e.target.value)
                                }
                            />
                        )}
                    </div>
                </Field>

                {/* ■ その他伝達事項欄 */}
                <Field label="■ その他伝達事項欄">
                    <textarea
                        className={textareaStyle}
                        value={form.application?.note ?? ""}
                        onChange={(e) =>
                            update("application", "note", e.target.value)
                        }
                    />
                </Field>
            </div>
        </>
    );
}