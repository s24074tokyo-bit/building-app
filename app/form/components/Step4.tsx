import Field from "./ui/Field";
import Select from "./ui/Select";
import {
    sectionStyle,
    inputStyle,
    textareaStyle,
} from "./styles/formStyles";

type MaterialItem = {
    material?: string;
    section?: string;
    note?: string;
};

type Materials = {
    foundation: MaterialItem;
    girder: MaterialItem;
    beam: MaterialItem;
    purlin: MaterialItem;
    column: MaterialItem;
    roofPost: MaterialItem;
    rafter: MaterialItem;
    brace: MaterialItem;
};

const commonMaterials = [
    "製材ヒノキKD",
    "製材ベイマツKD",
    "製材ツガKD",
    "製材ベイツガKD",
    "集成材オウシュウアカマツE105F300",
    "集成材スプルースE95F315",
    "製材",
    "集成材",
];

const braceMaterials = [
    "製材ヒノキKD",
    "製材ベイマツKD",
    "製材ツガKD",
    "製材ベイツガKD",
    "集成材オウシュウアカマツE105F300",
    "集成材スプルースE95F315",
    "製材",
];


// =====================================================
// 断面定義（mm表記済）
// =====================================================

const foundationSections = ["105mm×105mm", "120mm×120mm"];

const girderSections = [
    "90mm×90mm",
    "105mm×105mm",
    "120mm×120mm",
];

const beamSections = ["105mm幅", "120mm幅"];

const purlinSections = ["105mm幅", "120mm幅"];

const columnSections = ["105mm×105mm", "120mm×120mm"];

const roofPostSections = [
    "90mm×90mm",
    "105mm×105mm",
    "120mm×120mm",
];

const rafterSections = [
    "45mm×45mm",
    "45mm×60mm",
    "45mm×75mm",
    "45mm×90mm",
    "45mm×120mm",
    "45mm×150mm",
    "38mm×90mm",
    "38mm×140mm",
];

const braceSections = ["45mm×90mm", "45mm×105mm"];

export default function Step4({ form, update, updateNested }: any) {
    return (
        <>
            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ⑦ 地盤の確認
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                {/* ■ 申請データの確認 */}
                <Field label="■ 申請データの確認">
                    <Select
                        value={form.ground?.applicationData ?? ""}
                        onChange={(v: string) =>
                            update("ground", "applicationData", v)
                        }
                        options={[
                            "現地調査データで申請",
                            "近隣地盤データで申請",
                        ]}
                    />
                </Field>

                {/* ■ 依頼時の地盤データの確認 */}
                <Field label="■ 依頼時の地盤データの確認">
                    <Select
                        value={form.ground?.status ?? ""}
                        onChange={(v: string) =>
                            update("ground", "status", v)
                        }
                        options={[
                            "調査済み",
                            "申請までに調査予定",
                            "確認完了までに調査予定",
                            "確認完了後に調査予定",
                        ]}
                    />
                </Field>

                {/* ■ その他伝達事項欄 */}
                <Field label="■ その他伝達事項欄">
                    <textarea
                        className={textareaStyle}
                        value={form.ground?.note ?? ""}
                        onChange={(e) =>
                            update("ground", "note", e.target.value)
                        }
                    />
                </Field>
            </div>
            {/* =========================================================
                ⑧ 使用部材の確認
            ========================================================== */}

            <div className={sectionStyle}>
                <h2 className="text-xl font-bold text-blue-900 border-b border-blue-300 pb-2">
                    ⑧ 使用部材の確認
                </h2>

                <div className="text-sm text-blue-800">
                    （依頼書作成依頼）
                </div>

                <Field label="■ 過去物件を参照しますか？">
                    <Select
                        value={form.materials?.reference ?? ""}
                        onChange={(v: string) =>
                            update("materials", "reference", v)
                        }
                        options={[
                            "過去物件を参照",
                            "参照せず入力する",
                        ]}
                    />

                    {form.materials?.reference === "過去物件を参照" && (
                        <input
                            className={inputStyle}
                            placeholder="過去物件名を入力"
                            value={form.materials?.previousBuilding ?? ""}
                            onChange={(e) =>
                                update("materials", "previousBuilding", e.target.value)
                            }
                        />
                    )}

                    {form.materials?.reference === "参照せず入力する" && (
                        <>
                            {[
                                { key: "foundation", label: "土台", materials: commonMaterials, sections: foundationSections },
                                { key: "girder", label: "大引き", materials: commonMaterials, sections: girderSections },
                                { key: "beam", label: "梁桁", materials: commonMaterials, sections: beamSections },
                                { key: "purlin", label: "母屋", materials: commonMaterials, sections: purlinSections },
                                { key: "column", label: "柱", materials: commonMaterials, sections: columnSections },
                                { key: "roofPost", label: "小屋束", materials: commonMaterials, sections: roofPostSections },
                                { key: "rafter", label: "垂木", materials: commonMaterials, sections: rafterSections },
                                { key: "brace", label: "筋かい", materials: braceMaterials, sections: braceSections },
                            ].map((item) => (
                                <div key={item.key} className="border-2 border-blue-200 p-4 rounded-lg space-y-4">

                                    <div className="font-bold text-blue-900">
                                        ■ {item.label}
                                    </div>

                                    {/* ① 使用材料名称 */}
                                    <Field label="① 使用材料名称">
                                        <Select
                                            value={form.materials[item.key as keyof Materials].material ?? ""}
                                            onChange={(v: string) =>
                                                updateNested("materials", item.key as keyof Materials, "material", v)
                                            }
                                            options={item.materials}
                                        />
                                    </Field>

                                    {/* ② 断面 */}
                                    <Field label="② 断面">
                                        <Select
                                            value={form.materials[item.key as keyof Materials].section ?? ""}
                                            onChange={(v: string) =>
                                                updateNested("materials", item.key as keyof Materials, "section", v)
                                            }
                                            options={item.sections}
                                        />
                                    </Field>

                                    {/* ③ 備考欄（入力） */}
                                    <Field label="③ 備考欄（入力）">
                                        <input
                                            className={inputStyle}
                                            value={form.materials[item.key as keyof Materials].note ?? ""}
                                            onChange={(e) =>
                                                updateNested("materials", item.key as keyof Materials, "note", e.target.value)
                                            }
                                        />
                                    </Field>

                                </div>
                            ))}
                        </>
                    )}
                </Field>


            </div>
        </>
    );
}