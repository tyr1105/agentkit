"use client";

import { useState } from "react";
import { Bot, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-[#fafafa]">
              Agent<span className="gradient-text">Kit</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            >
              Templates
            </a>
            <a
              href="#pricing"
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#06b6d4] text-white hover:opacity-90 transition-opacity"
            >
              Get the Kit — $69
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#a1a1aa] hover:text-[#fafafa] cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#27272a] bg-[#09090b] px-4 py-4 space-y-3">
          <a
            href="#features"
            className="block text-sm text-[#a1a1aa] hover:text-[#fafafa]"
            onClick={() => setMobileOpen(false)}
          >
            Features
          </a>
          <a
            href="#templates"
            className="block text-sm text-[#a1a1aa] hover:text-[#fafafa]"
            onClick={() => setMobileOpen(false)}
          >
            Templates
          </a>
          <a
            href="#pricing"
            className="block text-sm text-[#a1a1aa] hover:text-[#fafafa]"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="block text-sm text-[#a1a1aa] hover:text-[#fafafa]"
            onClick={() => setMobileOpen(false)}
          >
            FAQ
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#06b6d4] text-white"
            onClick={() => setMobileOpen(false)}
          >
            Get the Kit — $69
          </a>
        </div>
      )}
    </nav>
  );
}
