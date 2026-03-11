type Props = {
  label: string;
  children: React.ReactNode;
};

export default function Field({ label, children }: Props) {
  return (
    <div className="space-y-2">
      <div className="font-semibold text-blue-900">{label}</div>
      {children}
    </div>
  );
}