import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuickCash } from "./QuickCash";
import { BillPrint } from "./BillPrint";
import { formatMoney } from "@/lib/money";

interface PaymentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  method: "cash" | "card";
  setMethod: (method: "cash" | "card") => void;
  tender: string;
  setTender: (tender: string) => void;
  total: number;
  change: number;
  onCompleteSale: () => void;
  cartEmpty: boolean;
  cart: any[]; // Add cart prop
  subtotal: number; // Add subtotal prop
  tax: number; // Add tax prop
}

export function PaymentSheet({
  open,
  onOpenChange,
  method,
  setMethod,
  tender,
  setTender,
  total,
  change,
  onCompleteSale,
  cartEmpty,
  cart,
  subtotal,
  tax
}: PaymentSheetProps) {
  const tenderNum = +(tender || "0");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button className="flex-1" disabled={cartEmpty}>
          Charge {!cartEmpty ? `• ${formatMoney(total)}` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Complete Payment</SheetTitle>
        </SheetHeader>

        <Tabs
          value={method}
          onValueChange={(v) => setMethod(v as "cash" | "card")}
          className="mt-4"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="cash">Cash</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
          </TabsList>

          <TabsContent value="cash" className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount tendered</label>
              <Input
                inputMode="decimal"
                placeholder="0.00"
                value={tender}
                onChange={(e) => setTender(e.target.value)}
              />
              <div className="text-sm text-muted-foreground">
                Change: <span className="font-medium">{formatMoney(Math.max(0, change))}</span>
              </div>
            </div>
            <QuickCash onPick={(amt) => setTender(amt.toFixed(2))} total={total} />
          </TabsContent>

          <TabsContent value="card" className="mt-4 space-y-2">
            <div className="text-sm text-muted-foreground">
              Card payment simulated for MVP.
            </div>
          </TabsContent>
        </Tabs>

        <SheetFooter className="mt-6 flex flex-col gap-3">
          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              onClick={onCompleteSale}
              disabled={method === "cash" && tenderNum < total}
            >
              Complete Sale
            </Button>
            
            {/* Print Bill Button - Only show after successful payment conditions */}
            {!cartEmpty && tenderNum >= total && (
              <BillPrint
                cart={cart}
                subtotal={subtotal}
                tax={tax}
                total={total}
                tender={tenderNum}
                change={change}
                paymentMethod={method}
              />
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}