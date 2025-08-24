"use client";

import { useState, useEffect } from "react";
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

interface TopNavProps {
  pageTitle: string;
  user?: {
    name: string;
    email: string;
    role: string;
    image?: string;
  };
}

export function TopNav({ pageTitle, user }: TopNavProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock user data
  const currentUser = user || {
    name: "John Doe",
    email: "john@example.com",
    role: "Cashier",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
  };

  // Format time function that handles server/client mismatch
  const formatTime = (date: Date | null) => {
    if (!date) return "--:--:--";
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Format date function that handles server/client mismatch
  const formatDate = (date: Date | null) => {
    if (!date) return "Loading...";
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Only render time/date after component is mounted to avoid hydration mismatch
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
                <BreadcrumbLink href="/pos">POS</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
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
              <BreadcrumbLink href="/pos">POS</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
          <Badge variant="secondary">MVP</Badge>
        </div>
      </div>

      {/* Right side: Time and User Profile */}
      <div className="flex items-center gap-6">
        {/* Date and Time */}
        <div className="text-sm text-muted-foreground text-right">
          <div className="font-medium">
            {formatTime(currentTime)}
          </div>
          <div>
            {formatDate(currentTime)}
          </div>
        </div>

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