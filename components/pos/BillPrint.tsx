"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { CartItem } from "@/types/product";
import { formatMoney } from "@/lib/money";

interface BillPrintProps {
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  tender: number;
  change: number;
  paymentMethod: string;
}

export function BillPrint({ 
  cart, 
  subtotal, 
  tax, 
  total, 
  tender, 
  change, 
  paymentMethod 
}: BillPrintProps) {
  const billRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: billRef, // Use contentRef instead of content
    documentTitle: `Bill-${Date.now()}`,
    pageStyle: `
      @media print {
        body { 
          -webkit-print-color-adjust: exact; 
          font-family: 'Courier New', monospace;
        }
        .bill-container { 
          width: 80mm; 
          margin: 0 auto; 
          padding: 10px;
          font-size: 12px;
        }
        .no-print { display: none !important; }
        .print-only { display: block !important; }
      }
    `,
  });

  const currentDate = new Date().toLocaleString();

  return (
    <div>
      <Button
        onClick={handlePrint}
        variant="outline"
        size="sm"
        className="no-print"
      >
        <PrinterIcon className="w-4 h-4 mr-2" />
        Print Bill
      </Button>

      <div ref={billRef} className="bill-container hidden print:block">
        {/* Bill Content */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold uppercase">Supermarket Name</h2>
          <p className="text-xs">123 Main Street, City</p>
          <p className="text-xs">Phone: (123) 456-7890</p>
          <p className="text-xs">GSTIN: 12ABCDE1234F1Z5</p>
        </div>

        <div className="border-t border-b border-dashed py-2 mb-3">
          <div className="flex justify-between text-xs">
            <span>Date:</span>
            <span>{currentDate}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Bill No:</span>
            <span>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Payment:</span>
            <span className="uppercase">{paymentMethod}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-3">
          <div className="grid grid-cols-5 text-xs font-bold mb-1">
            <div className="col-span-2">Item</div>
            <div className="text-center">Qty</div>
            <div className="text-right">Price</div>
            <div className="text-right">Total</div>
          </div>
          
          {cart.map((item) => (
            <div key={item.product.id} className="grid grid-cols-5 text-xs border-b border-dashed py-1">
              <div className="col-span-2 truncate">
                {item.product.sinhalaName || item.product.name}
              </div>
              <div className="text-center">{item.qty}</div>
              <div className="text-right">{formatMoney(item.product.price)}</div>
              <div className="text-right">{formatMoney(item.product.price * item.qty)}</div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-dashed pt-2 mb-3">
          <div className="flex justify-between text-xs">
            <span>Subtotal:</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Tax (8%):</span>
            <span>{formatMoney(tax)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t border-dashed pt-1 mt-1">
            <span>TOTAL:</span>
            <span>{formatMoney(total)}</span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-t border-dashed pt-2 mb-4">
          <div className="flex justify-between text-xs">
            <span>Amount Tendered:</span>
            <span>{formatMoney(tender)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Change:</span>
            <span>{formatMoney(change)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs">
          <p className="mb-1">Thank you for your purchase!</p>
          <p>*** Please keep this bill for returns ***</p>
          <p className="mt-2">Powered by POS System</p>
        </div>
      </div>
    </div>
  );
}