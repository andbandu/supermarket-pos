import { Button } from "@/components/ui/button";
import { roundUp } from "@/lib/round";
import { formatMoney } from "@/lib/money";

interface QuickCashProps {
  total: number;
  onPick: (amount: number) => void;
}

export function QuickCash({ total, onPick }: QuickCashProps) {
  const opts = [total, roundUp(total, 0.5), roundUp(total, 1), roundUp(total, 5), roundUp(total, 10)];
  
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((amount, index) => (
        <Button key={index} variant="secondary" onClick={() => onPick(amount)}>
          {formatMoney(amount)}
        </Button>
      ))}
    </div>
  );
}