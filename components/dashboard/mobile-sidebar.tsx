"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Package2, 
  MessageCircle, 
  User, 
  Settings, 
  ShoppingCart, 
  CreditCard,
  Bookmark 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Dashboard.common");

  const navItems = [
    {
      href: `/${locale}/dashboard`,
      icon: <Home className="h-4 w-4" />,
      title: t("dashboard"),
    },
    {
      href: `/${locale}/dashboard/listings`,
      icon: <Package2 className="h-4 w-4" />,
      title: t("listings"),
    },
    {
      href: `/${locale}/dashboard/messages`,
      icon: <MessageCircle className="h-4 w-4" />,
      title: t("messages"),
    },
    {
      href: `/${locale}/dashboard/profile`,
      icon: <User className="h-4 w-4" />,
      title: t("profile"),
    },
    {
      href: `/${locale}/dashboard/purchases`,
      icon: <ShoppingCart className="h-4 w-4" />,
      title: t("purchases"),
    },
    {
      href: `/${locale}/dashboard/sales`,
      icon: <CreditCard className="h-4 w-4" />,
      title: t("sales"),
    },
    {
      href: `/${locale}/dashboard/subscriptions`,
      icon: <Bookmark className="h-4 w-4" />,
      title: t('subscriptions'),
    },
    {
      href: `/${locale}/dashboard/settings`,
      icon: <Settings className="h-4 w-4" />,
      title: t("settings"),
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex h-14 items-center border-b px-6 font-semibold">
          MarketFlex
        </div>
        <div className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
} 