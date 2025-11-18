"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoutButton } from "@/components/auth/logout-button"
import { useState } from "react"

export function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/documents", label: "Documents" },
    { href: "/skills", label: "Skills" },
    { href: "/careers", label: "Careers" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm ${
              pathname === link.href
                ? "text-white bg-white/10"
                : "text-white/70 hover:text-white hover:bg-white/10"
            } px-3 py-2 rounded-lg transition-all`}
          >
            {link.label}
          </Link>
        ))}
        <div className="ml-2">
          <LogoutButton />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
      >
        {mobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 mt-0">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block ${
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                } px-4 py-3 rounded-lg transition-all`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
