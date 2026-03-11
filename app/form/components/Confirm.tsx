import Field from "./ui/Field";
import {
    sectionStyle,
    inputStyle,
    textareaStyle,
} from "./styles/formStyles";

type Props = {
    form: any;
};

const ReadOnlyInput = ({ value }: { value: string }) => (
    <input className={inputStyle} value={value ?? ""} readOnly />
);

const ReadOnlyTextarea = ({ value }: { value: string }) => (
    <textarea className={textareaStyle} value={value ?? ""} readOnly />
);

const building2Fields = [
    { key: "did", label: "意匠図に記載" },
    { key: "glToDesign", label: "平均GL〜設計GL" },
    { key: "designToFoundation", label: "設計GL〜基礎天" },
    { key: "foundationToBase", label: "基礎天〜土台天" },
    { key: "baseToSecondBeam", label: "土台天〜2階梁天" },
    { key: "secondToThirdBeam", label: "2階梁天〜3階梁天" },
    { key: "firstToRoofBeam", label: "1階梁天〜小屋梁天" },
    { key: "secondToRoofBeam", label: "2階梁天〜小屋梁天" },
    { key: "thirdToRoofBeam", label: "3階梁天〜小屋梁天" },
    { key: "firstFloorThickness", label: "1階床厚" },
    { key: "secondFloorThickness", label: "2階床厚" },
    { key: "thirdFloorThickness", label: "3階床厚" },
];

const designFields = [
    { key: "method", label: "工法" },
    { key: "otherContent", label: "金物名(金物工法の場合のみ入力)" },
    { key: "seismicPerformance", label: "耐震性能" },
    { key: "windPerformance", label: "耐風性能" },
    { key: "snowRegion", label: "積雪区分" },
    { key: "snowAmount", label: "積雪量" },
];

const foundationFields = [
    { key: "did", label: "意匠図に記載" },
    { key: "shape", label: "基礎形状" },
    { key: "frost", label: "凍結震度有無" },
    { key: "frostValue", label: "凍結震度(cm)" },
    { key: "deep", label: "深基礎有無" },
    { key: "deepValue", label: "深さ" },
    { key: "high", label: "高基礎有無" },
    { key: "highValue", label: "高さ" },
];

const materialLabels: Record<string, string> = {
    foundation: "土台",
    girder: "大引き",
    beam: "梁桁",
    purlin: "母屋",
    column: "柱",
    roofPost: "小屋束",
    rafter: "垂木",
    brace: "筋かい",
};

export default function Confirm({ form }: Props) {
    return (
        <div className="max-w-6xl mx-auto p-10 space-y-12 bg-blue-50 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-700 border-b-4 border-blue-400 pb-3">
                入力内容確認
            </h1>

            {/* ============================= */}
            {/* 共通セクションテンプレ */}
            {/* ============================= */}

            {/* ① お客様情報 */}
            <Section title="① お客様情報">
                <TwoCol>
                    <Field label="依頼会社名">
                        <ReadOnlyInput value={form.customer?.companyName} />
                    </Field>
                    <Field label="物件名">
                        <ReadOnlyInput value={form.customer?.projectName} />
                    </Field>
                    <Field label="担当者名">
                        <ReadOnlyInput value={form.customer?.personInCharge} />
                    </Field>
                    <Field label="電話番号">
                        <ReadOnlyInput value={form.customer?.phone} />
                    </Field>
                </TwoCol>
                <Field label="依頼会社と異なる会社名">
                    <ReadOnlyInput value={form.customer?.differentCompany} />
                </Field>
                <Field label="その他">
                    <ReadOnlyTextarea value={form.customer?.note} />
                </Field>
            </Section>

            {/* ② 申請情報 */}
            <Section title="② 申請情報">
                <TwoCol>
                    <Field label="申請予定日">
                        <ReadOnlyInput value={form.application?.plannedDate} />
                    </Field>
                    <Field label="申請先">
                        <ReadOnlyInput value={form.application?.destination} />
                    </Field>
                </TwoCol>
                <Field label="申請内容">
                    <ReadOnlyInput value={form.application?.content} />
                </Field>
                <Field label="その他申請内容">
                    <ReadOnlyInput value={form.application?.otherContent} />
                </Field>
                <Field label="その他">
                    <ReadOnlyTextarea value={form.application?.note} />
                </Field>
            </Section>

            {/* ③ 建物情報① */}
            <Section title="③ 建物情報①">
                <TwoCol>
                    <Field label="構造種別">
                        <ReadOnlyInput value={form.building1?.structureType} />
                    </Field>
                    <Field label="階数">
                        <ReadOnlyInput value={form.building1?.floorCount} />
                    </Field>
                    <Field label="ペントハウス">
                        <ReadOnlyInput value={form.building1?.penthouse} />
                    </Field>
                    <Field label="用途">
                        <ReadOnlyInput value={form.building1?.usage} />
                    </Field>
                    <Field label="耐火要件">
                        <ReadOnlyInput value={form.building1?.fireRequirement} />
                    </Field>
                </TwoCol>
                <Field label="その他">
                    <ReadOnlyTextarea value={form.building1?.note} />
                </Field>
            </Section>

            {/* ④ 建物情報② */}
            <Section title="④ 建物情報②　　※意匠図に記載済みの場合、入力は不要です。">
                <TwoCol>
                    {building2Fields.map(({ key, label }) => (
                        <Field key={key} label={label}>
                            <ReadOnlyInput value={form.building2?.[key] ?? ""} />
                        </Field>
                    ))}
                </TwoCol>

                <Field label="その他">
                    <ReadOnlyTextarea value={form.building2?.note ?? ""} />
                </Field>
            </Section>

            {/* ⑤ 設計条件 */}
            <Section title="⑤ 設計条件">
                <TwoCol>
                    {designFields.map(({ key, label }) => (
                        <Field key={key} label={label}>
                            <ReadOnlyInput value={form.design?.[key] ?? ""} />
                        </Field>
                    ))}
                </TwoCol>

                <Field label="その他">
                    <ReadOnlyTextarea value={form.design?.note ?? ""} />
                </Field>
            </Section>

            {/* ⑥ 基礎条件 */}
            <Section title="⑥ 基礎条件　　※意匠図に記載済みの場合、入力は不要です。">
                <TwoCol>
                    {foundationFields.map(({ key, label }) => (
                        <Field key={key} label={label}>
                            <ReadOnlyInput value={form.foundation?.[key] ?? ""} />
                        </Field>
                    ))}
                </TwoCol>

                <Field label="その他">
                    <ReadOnlyTextarea value={form.foundation?.note ?? ""} />
                </Field>
            </Section>

            {/* ⑦ 地盤確認 */}
            <Section title="⑦ 地盤確認">
                <TwoCol>
                    <Field label="申請データ確認">
                        <ReadOnlyInput value={form.ground?.applicationData} />
                    </Field>
                    <Field label="地盤データ確認">
                        <ReadOnlyInput value={form.ground?.status} />
                    </Field>
                </TwoCol>
                <Field label="その他">
                    <ReadOnlyTextarea value={form.ground?.note} />
                </Field>
            </Section>

            {/* ⑧ 使用部材 */}
            <Section title="⑧ 使用部材">

                {/* 過去物件 */}
                <TwoCol>
                    <Field label="過去物件参照">
                        <ReadOnlyInput value={form.materials?.reference ?? ""} />
                    </Field>

                    <Field label="過去物件名">
                        <ReadOnlyInput value={form.materials?.previousBuilding ?? ""} />
                    </Field>
                </TwoCol>

                <span className="text-sm text-sky-500 font-medium">
                    ※ 過去物件参照の場合は、参照するorしないに加え、過去物件名を入力してください。
                    　その他部材情報の入力は不要です。
                </span>

                {/* 各部材 */}
                {Object.entries(materialLabels).map(([key, label]) => {
                    const item = form.materials?.[key];

                    return (
                        <div key={key} className="border-t pt-6 mt-6">
                            <h3 className="text-lg font-semibold text-blue-600 mb-4">
                                {label}
                            </h3>

                            <TwoCol>
                                <Field label="使用材料名称">
                                    <ReadOnlyInput value={item?.material ?? ""} />
                                </Field>

                                <Field label="断面">
                                    <ReadOnlyInput value={item?.section ?? ""} />
                                </Field>
                            </TwoCol>

                            <Field label="備考">
                                <ReadOnlyTextarea value={item?.note ?? ""} />
                            </Field>
                        </div>
                    );
                })}
            </Section>

            {/* ⑨ 耐力壁 */}
            <Section title="⑨ 耐力壁">
                <TwoCol>
                    <Field label="外周">
                        <ReadOnlyInput value={form.wall?.outer} />
                    </Field>
                    <Field label="内部">
                        <ReadOnlyInput value={form.wall?.inner} />
                    </Field>
                </TwoCol>
                <Field label="その他">
                    <ReadOnlyTextarea value={form.wall?.note} />
                </Field>
            </Section>

            {/* ⑩ 納品・請求 */}
            <Section title="⑩ 納品・請求">
                <TwoCol>
                    <Field label="納品方法">
                        <ReadOnlyInput value={form.delivery?.method} />
                    </Field>
                    <Field label="送付先">
                        <ReadOnlyInput value={form.delivery?.destination} />
                    </Field>
                    <Field label="請求先">
                        <ReadOnlyInput value={form.delivery?.billingTo} />
                    </Field>
                    <Field label="請求送付先">
                        <ReadOnlyInput value={form.delivery?.billingAddress} />
                    </Field>
                </TwoCol>
            </Section>

            {/* ボタン */}
        </div>
    );
}

/* ============================= */
/* 補助コンポーネント */
/* ============================= */

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className={sectionStyle}>
            <h2 className="text-xl font-semibold text-blue-600 border-b pb-2">
                {title}
            </h2>
            <div className="space-y-6 mt-4">{children}</div>
        </section>
    );
}

function TwoCol({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>;
}