"use client";

import React from "react";
import type { FormDataType, MaterialItem } from "@/types/form";
import { Copy, Check } from "lucide-react";

type Props = {
    form: FormDataType;
    isAdmin: boolean;
};

export default function Confirm({ form, isAdmin }: Props) {
    const handleDownloadPDF = () => {
        window.print();
    };
    const created = form.createdAt?.toDate?.();

    const company = form.customer.companyName || "会社名";
    const project = form.customer.projectName || "物件";

    const filename = `依頼シート-${company}-${project}.pdf`;

    const [copied, setCopied] = React.useState(false);

    const handleCopyFilename = async () => {
        await navigator.clipboard.writeText(filename);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <>

            {/* ================= 1ページ目 ================= */}
            <div className="page">
                <h1 className="title">構造依頼書</h1>
                {isAdmin &&(
                <div className="text-sm text-blue-700">
                    作成日 :
                    {created
                        ? created.toLocaleString("ja-JP")
                        : ""}
                </div>
                )}



                {/* ================= ① お客様情報 ================= */}
                <SectionTitle title="① お客様情報" />
                <KeyValueTable
                    data={[
                        ["依頼会社様名", form.customer.companyName],
                        ["物件名", form.customer.projectName],
                        ["担当者様名", form.customer.personInCharge],
                        //["依頼会社と異なる場合の会社名", form.customer.differentCompany],
                        ["電話番号", form.customer.phone],
                        ["その他の伝達事項", form.customer.note],
                    ]}
                />

                {/* ================= ② 申請情報 ================= */}
                <SectionTitle title="② 申請情報" />
                <KeyValueTable
                    data={[
                        ["申請予定日", form.application.plannedDate],
                        ["申請先", form.application.destination],
                        ["申請内容", form.application.content],
                        ["その他の場合の申請内容", form.application.otherContent],
                        ["その他伝達事項", form.application.note],
                    ]}
                />

                {/* ================= ⑩ 納品・請求 ================= */}
                <SectionTitle title="⑩ 納品・請求" />
                <KeyValueTable
                    data={[
                        ["納品方法", form.delivery.method],
                        ["送付先", form.delivery.destination],
                        ["請求先", form.delivery.billingTo],
                        ["請求送付先", form.delivery.billingAddress],
                    ]}
                />

                {/* ================= ③ 建物情報① ================= */}
                <SectionTitle title="③ 建物情報①" />
                <KeyValueTable
                    data={[
                        ["構造種別", form.building1.structureType],
                        ["階数", form.building1.floorCount],
                        ["ペントハウスの有無", form.building1.penthouse],
                        ["用途", form.building1.usage],
                        ["耐火要件", form.building1.fireRequirement],
                        ["その他の伝達事項", form.building1.note],
                    ]}
                />

                {/* ================= ④ 建物情報② ================= */}
                <SectionTitle title="④ 建物情報②" />
                <KeyValueTable
                    data={[
                        ["意匠図に記載されているか", form.building2.did],
                        ["平均GL〜設計GL", form.building2.glToDesign],
                        ["設計GL〜基礎天", form.building2.designToFoundation],
                        ["基礎天〜土台天", form.building2.foundationToBase],
                        ["土台天〜2階梁天", form.building2.baseToSecondBeam],
                        ["2階梁天〜3階梁天", form.building2.secondToThirdBeam],
                        ["1階梁天〜小屋梁天", form.building2.firstToRoofBeam],
                        ["2階梁天〜小屋梁天", form.building2.secondToRoofBeam],
                        ["3階梁天〜小屋梁天", form.building2.thirdToRoofBeam],
                        ["1階床厚", form.building2.firstFloorThickness],
                        ["2階床厚", form.building2.secondFloorThickness],
                        ["3階床厚", form.building2.thirdFloorThickness],
                        ["その他伝達事項", form.building2.note],
                    ]}
                />
            </div>
            {/* ================= 2ページ目 ================= */}
            <div className="page">

                {/* ================= ⑤ 設計条件 ================= */}
                <SectionTitle title="⑤ 設計条件" />
                <KeyValueTable
                    data={[
                        ["工法", form.design.method],
                        ["金物工法の金物", form.design.otherContent],
                        ["耐震性能", form.design.seismicPerformance],
                        ["耐風性能", form.design.windPerformance],
                        ["基準風速", form.design.baseWindSpeed],
                        ["積雪区分", form.design.snowRegion],
                        ["積雪量", form.design.snowAmount],
                        ["雪下ろし適応後の積雪量", form.design.snowAmountAfterRemoval],
                        ["その他の伝達事項", form.design.note],
                    ]}
                />

                {/* ================= ⑥ 基礎条件 ================= */}
                <SectionTitle title="⑥ 基礎条件" />
                <KeyValueTable
                    data={[
                        ["基礎条件が意匠図に記載されているか", form.foundation.did],
                        ["基礎形状", form.foundation.shape],
                        ["凍結震度の有無", form.foundation.frost],
                        //["凍結震度（cm）", form.foundation.frostValue],
                        ["深基礎の有無", form.foundation.deep],
                        //["深さ", form.foundation.deepValue],
                        ["高基礎の有無", form.foundation.high],
                        ["高さ", form.foundation.highValue],
                        ["その他の伝達事項", form.foundation.note],
                    ]}
                />

                {/* ================= ⑦ 地盤確認 ================= */}
                <SectionTitle title="⑦ 地盤確認" />
                <KeyValueTable
                    data={[
                        ["申請データの確認", form.ground.applicationData],
                        ["依頼時の地盤データの確認", form.ground.status],
                        ["その他の伝達事項", form.ground.note],
                    ]}
                />

                {/* ================= ⑧ 使用部材 ================= */}
                <SectionTitle title="⑧ 使用部材" />

                <KeyValueTable
                    data={[
                        ["過去物件を参照しますか？", form.materials.reference],
                        ["参照方法", form.materials.howTo],
                    ]}
                />

                <MaterialsTable materials={form.materials} />

                {/* ================= ⑨ 耐力壁 ================= */}
                <SectionTitle title="⑨ 耐力壁" />
                <KeyValueTable
                    data={[
                        ["外周で使用する耐力面材名称", form.wall.outer],
                        ["内部で使用する耐力面材名称", form.wall.inner],
                        ["その他伝達事項欄", form.wall.note],
                    ]}
                />

                {/* ================= 自動追加データ ================= */}
            </div>


            <div className="copy-box fixed bottom-40 right-6 z-50">
                <div
                    className="
      flex items-center gap-2
      bg-white/80
      backdrop-blur-md
      border border-gray-200
      shadow-xl
      rounded-2xl
      px-3 py-2
      max-w-[420px]
      "
                >
                    {/* ファイル名（横スクロール） */}
                    <div
                        className="
        flex-1
        text-sm
        text-gray-700
        font-medium
        overflow-x-auto
        whitespace-nowrap
        scrollbar-thin
        "
                    >
                        {filename}
                    </div>

                    {/* コピーアイコン */}
                    <button
                        onClick={handleCopyFilename}
                        className="
        shrink-0
        p-2
        rounded-lg
        hover:bg-gray-100
        transition
        "
                    >
                        {copied ? (
                            <Check size={18} className="text-green-600" />
                        ) : (
                            <Copy size={18} className="text-gray-600" />
                        )}
                    </button>

                </div>

            </div>



             <button
                        onClick={handleDownloadPDF}
                        className="
    print-button
    fixed
    bottom-35
    right-6
    px-6
    py-3
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-purple-600
    text-white
    font-semibold
    shadow-xl
    hover:shadow-2xl
    hover:scale-105
    active:scale-95
    transition-all
    duration-300
    backdrop-blur-md
  "
                    >
                        📄 PDFダウンロード
                    </button>

            <PrintStyle />
        </>
    );
}

function MaterialsTable({
    materials,
}: {
    materials: FormDataType["materials"];
}) {
    const items: [string, MaterialItem][] = [
        ["土台", materials.foundation],
        ["大引き", materials.girder],
        ["梁桁", materials.beam],
        ["母屋", materials.purlin],
        ["柱", materials.column],
        ["小屋束", materials.roofPost],
        ["垂木", materials.rafter],
        ["筋かい", materials.brace],
    ];

    return (
        <table className="materials-table">
            {/* ✅ 横幅比率指定 */}
            <colgroup>
                <col />
                <col />
                <col />
                <col />
            </colgroup>

            <thead>
                <tr>
                    <th>部材名</th>
                    <th>使用材料名称</th>
                    <th>断面</th>
                    <th>備考欄</th>
                </tr>
            </thead>

            <tbody>
                {items.map(([label, m], i) => (
                    <tr key={i}>
                        <td>{label}</td>
                        <td>{m.material}</td>
                        <td>{m.section}</td>
                        <td>{m.note}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        
    );
}

function SectionTitle({ title }: { title: string }) {
    return <h2 className="section-title">{title}</h2>;
}

function KeyValueTable({
    data,
}: {
    data: [string, any][];
}) {
    return (
        <table>
            <tbody>
                {data.map(([label, value], i) => (
                    <tr key={i}>
                        <th>{label}</th>
                        <td>{value ?? ""}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function PrintStyle() {
    return (
        <style jsx global>{`
      @media print {
        @page {
          size: A4;
          margin: 10mm;
        }

        .print-button {
          display: none;
        }
        
        .copy-box{
        display: none;
        }
      }

      body {
        font-family: sans-serif;
      }


.page {
  position: relative;
  width: 210mm;
  min-height: 297mm;
  padding: 10mm;
  box-sizing: border-box;
  page-break-after: always;
  margin: 0 auto;
}

/* ウォーターマーク */
.page::before {
  content: "";
  position: absolute;
  inset: 0;

  background-image:
    url("/company-logo.png"),
    url("/company-logo.png");

  background-repeat: repeat;

  /* ロゴサイズ */
  background-size: 140px 140px, 140px 140px;

  /* ここがキモ（半分ズラす） */
  background-position:
    0 0,
    70px 70px;

  opacity: 0.05;

  pointer-events: none;
  z-index: 0;
}

.page > * {
  position: relative;
  z-index: 1;
}

      .title {
        text-align: center;
        font-size: 18px;
        margin-bottom: 8px;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        margin-top: 6px;
        border-bottom: 1px solid #000;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
        margin-bottom: 6px;
        table-layout : fixed;
      }

      th,
      td {
        border: 1px solid #000;
        padding: 3px 5px;
        vertical-align: top;
        width: 65%;
      }

      th {
        background: #f5f5f5;
        width: 35%;
      }

      .materials-table {
  table-layout: fixed;
  width: 100%;
}

.materials-table col:nth-child(1) { width: 15%; }
.materials-table col:nth-child(2) { width: 30%; }
.materials-table col:nth-child(3) { width: 25%; }
.materials-table col:nth-child(4) { width: 30%; }

.materials-table th,
.materials-table td {
  word-break: break-word;
    `}</style>
    );
}