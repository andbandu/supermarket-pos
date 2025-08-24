interface TotalsRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export function TotalsRow({ label, value }: TotalsRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground">{label}</div>
      <div>{value}</div>
    </div>
  );
}