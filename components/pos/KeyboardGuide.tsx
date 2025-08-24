"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { KeyboardIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function KeyboardGuide() {
  const [open, setOpen] = useState(false);

  const shortcuts = [
    { key: "F1", description: "Open Payment Dialog" },
    { key: "F2", description: "Complete Sale" },
    { key: "F3", description: "Print Bill" },
    { key: "F8", description: "Clear Cart" },
    { key: "F9", description: "Clear Search" },
    { key: "Esc", description: "Close/Clear" },
    { key: "Ctrl + Enter", description: "Add First Filtered Item" },
    { key: "Ctrl + P", description: "Quick Print" },
    { key: "Ctrl + S", description: "Quick Sale" },
    { key: "Enter", description: "Add Item (in search field)" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <KeyboardIcon className="w-4 h-4" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">
                {shortcut.key}
              </kbd>
              <span className="text-sm">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}