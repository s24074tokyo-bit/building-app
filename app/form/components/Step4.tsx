import Field from "./ui/Field";
import Select from "./ui/Select";
import {
  sectionStyle,
  inputStyle,
  textareaStyle,
} from "./styles/formStyles";

type MaterialItem = {
  material?: string;
  materialOther?: string;
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
  "製材スギKD",
  "集成材スギE65F255",
  "集成材オウシュウアカマツE105F300",
  "集成材スプルースE95F315",
  "梁せいにより使い分ける（備考欄に記載して下さい）",
  "その他",
];

const braceMaterials = [
  "製材スギKD",
  "製材ベイマツKD",
  "製材ヒノキKD",
  "製材スプルースKD",
  "製材ツガKD",
  "製材ベイツガKD",
  "その他",
];

const materialConfig = [
  {
    key: "foundation",
    label: "土台",
    materials: commonMaterials,
    sections: ["105mm×105mm", "120mm×120mm"],
  },
  {
    key: "girder",
    label: "大引き",
    materials: commonMaterials,
    sections: ["90mm×90mm", "105mm×105mm", "120mm×120mm"],
  },
  {
    key: "beam",
    label: "梁桁",
    materials: commonMaterials,
    sections: ["105mm幅", "120mm幅"],
  },
  {
    key: "purlin",
    label: "母屋",
    materials: commonMaterials,
    sections: ["90mm×90mm", "105mm幅", "120mm幅"],
  },
  {
    key: "column",
    label: "柱",
    materials: commonMaterials,
    sections: ["105mm×105mm", "120mm×120mm"],
  },
  {
    key: "roofPost",
    label: "小屋束",
    materials: commonMaterials,
    sections: ["90mm×90mm", "105mm×105mm", "120mm×120mm"],
  },
  {
    key: "rafter",
    label: "垂木",
    materials: braceMaterials,
    sections: [
      "45mm×45mm",
      "45mm×60mm",
      "45mm×75mm",
      "45mm×90mm",
      "45mm×120mm",
      "45mm×150mm",
      "38mm×90mm",
      "38mm×140mm",
    ],
  },
  {
    key: "brace",
    label: "筋かい",
    materials: braceMaterials,
    sections: ["45mm×90mm", "45mm×105mm"],
  },
];

function MaterialBlock({ item, form, updateNested }: any) {
  const data = form.materials[item.key] ?? {};

  return (
    <div className="border-2 border-blue-200 p-4 rounded-lg space-y-4">

      <div className="font-bold text-blue-900">
        ■ {item.label}
      </div>

      <Field label="① 使用材料">
        <Select
          value={data.material ?? ""}
          onChange={(v: string) =>
            updateNested("materials", item.key, "material", v)
          }
          options={item.materials}
        />

        {data.material === "その他" && (
          <input
            className={inputStyle + " mt-2"}
            placeholder="使用材料を入力"
            value={data.materialOther ?? ""}
            onChange={(e) =>
              updateNested(
                "materials",
                item.key,
                "materialOther",
                e.target.value
              )
            }
          />
        )}
      </Field>

      <Field label="② 断面">
        <Select
          value={data.section ?? ""}
          onChange={(v: string) =>
            updateNested("materials", item.key, "section", v)
          }
          options={item.sections}
        />
      </Field>

      <Field label="③ 備考欄">
        <input
          className={inputStyle}
          value={data.note ?? ""}
          onChange={(e) =>
            updateNested("materials", item.key, "note", e.target.value)
          }
        />
      </Field>

    </div>
  );
}

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

          {form.materials?.reference === "参照せず入力する" && (
            <div className="space-y-6 mt-4">
              {materialConfig.map((item) => (
                <MaterialBlock
                  key={item.key}
                  item={item}
                  form={form}
                  updateNested={updateNested}
                />
              ))}
            </div>
          )}
        </Field>
      </div>
    </>
  );
}