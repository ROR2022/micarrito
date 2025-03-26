"use client";

import React from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './sidebar';
import { Button } from '@/components/ui/button';
//import { useTranslations } from 'next-intl';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  //const t = useTranslations('Dashboard.common');
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden text-base-content">
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close sidebar"
      />
      <div className="relative flex w-full max-w-xs flex-1 flex-col bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">MarketFlex</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="overflow-y-auto p-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
} 