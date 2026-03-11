import { inputStyle } from "../styles/formStyles";

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
};

export default function Select({ value, onChange, options }: Props) {
  return (
    <select
      className={inputStyle}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">選択してください</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}