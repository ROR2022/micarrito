"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function HelpSearch() {
  const t = useTranslations("Help");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/help/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pl-10 h-12 rounded-l-lg border-r-0"
            />
          </div>
          <Button type="submit" className="rounded-l-none h-12 px-6">
            {t("search")}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground mt-2">
          {t("searchHelperText")}
        </p>
      </div>
    </div>
  );
} 