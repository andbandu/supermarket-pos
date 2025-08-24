"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  SettingsIcon, 
  LogOutIcon,
  KeyboardIcon,
  HelpCircleIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const navigationItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/pos", icon: ShoppingCartIcon, label: "POS" },
];

const bottomItems = [
  { href: "/profile", icon: UserIcon, label: "Profile" },
  { href: "/settings", icon: SettingsIcon, label: "Settings" },
  { href: "/logout", icon: LogOutIcon, label: "Logout" },
];

const keyboardShortcuts = [
  { key: "F1", description: "Open Payment" },
  { key: "F2", description: "Complete Sale" },
  { key: "F3", description: "Print Bill" },
  { key: "F8", description: "Clear Cart" },
  { key: "F9", description: "Clear Search" },
  { key: "Esc", description: "Close/Clear" },
  { key: "Ctrl+Enter", description: "Add Item" },
  { key: "Ctrl+P", description: "Quick Print" },
  { key: "Ctrl+S", description: "Quick Sale" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="w-20 h-screen bg-background border-r flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center py-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="w-full flex justify-center">
              <Button
                variant={isActive ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "w-12 h-12 rounded-xl transition-all",
                  isActive && "bg-primary text-primary-foreground"
                )}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </Button>
            </Link>
          );
        })}
      </nav>

      

    

      {/* Bottom Actions */}
      <div className="pb-6 border-t pt-4">
        <nav className="flex flex-col items-center space-y-2">
            {/* Keyboard Shortcuts Help */}
     
        <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-xl mx-auto mb-2"
              title="Keyboard Shortcuts"
            >
              <KeyboardIcon className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {keyboardShortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono min-w-[60px] text-center">
                    {shortcut.key}
                  </kbd>
                  <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      
          {bottomItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="w-full flex justify-center">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-xl transition-all",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}