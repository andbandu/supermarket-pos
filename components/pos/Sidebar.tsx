"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  SettingsIcon, 
  LogOutIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/pos", icon: ShoppingCartIcon, label: "POS" },
];

const bottomItems = [
  { href: "/profile", icon: UserIcon, label: "Profile" },
  { href: "/settings", icon: SettingsIcon, label: "Settings" },
  { href: "/logout", icon: LogOutIcon, label: "Logout" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-20 h-screen bg-white border-r flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b">
        <Logo />
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