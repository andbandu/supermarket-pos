"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface TopNavProps {
  pageTitle?: string;
  user?: {
    name: string;
    email: string;
    role: string;
    image?: string;
  };
}

export function TopNav({ pageTitle, user }: TopNavProps) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get page title based on route
  const getPageTitle = () => {
    if (pageTitle) return pageTitle;
    
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/pos":
        return "Cashier";
      case "/inventory":
        return "Inventory";
      case "/customers":
        return "Customers";
      case "/reports":
        return "Reports";
      default:
        return "Dashboard";
    }
  };

  // Get breadcrumb items based on route
  const getBreadcrumbItems = () => {
    const items = [
      { href: "/", label: "Home" }
    ];

    if (pathname === "/pos") {
      items.push({ href: "/pos", label: "POS" });
    } else if (pathname !== "/") {
      items.push({ href: pathname, label: getPageTitle() });
    }

    return items;
  };

  // Mock user data
  const currentUser = user || {
    name: "John Doe",
    email: "john@example.com",
    role: "Cashier",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
  };

  if (!isMounted) {
    return (
      <div className="h-16 bg-background border-b flex items-center justify-between px-6 fixed top-0 left-20 right-0 z-40">
        {/* Left side: Breadcrumb and Page Title */}
        <div className="flex items-center gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Skeleton className="h-4 w-16" />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32" />
            <Badge variant="secondary">MVP</Badge>
          </div>
        </div>

        {/* Right side: Time and User Profile */}
        <div className="flex items-center gap-6">
          {/* Date and Time Skeleton */}
          <div className="text-sm text-muted-foreground text-right">
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* User Profile Skeleton */}
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    );
  }

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="h-16 bg-background border-b flex items-center justify-between px-6 fixed top-0 left-20 right-0 z-40">
      {/* Left side: Breadcrumb and Page Title */}
      <div className="flex items-center gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && (
                <BreadcrumbSeparator />
              )}
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        <Badge variant="secondary">MVP</Badge>
      </div>
    </div>

      {/* Right side: Time and User Profile */}
      <div className="flex items-center gap-6">
        {/* Date and Time */}
        <TimeDisplay />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.image} alt={currentUser.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium">{currentUser.name}</div>
                <div className="text-xs text-muted-foreground">{currentUser.role}</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Separate component for time display to avoid hydration issues
function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-sm text-muted-foreground text-right">
      <div className="font-medium">
        {currentTime.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })}
      </div>
      <div>
        {currentTime.toLocaleDateString(undefined, { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
}