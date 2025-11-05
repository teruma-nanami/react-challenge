import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HamburgerButton } from "../ui/HamburgerButton";

// Small util to join class names
const cx = (...v: Array<string | false | null | undefined>) => v.filter(Boolean).join(" ");

// メニュー定義（常時表示。ログイン機構は撤去済みのため簡略化）
const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/user-management", label: "User Management" },
  { to: "/login", label: "Login" },
] as const;

// Component classes are defined in src/index.css via @layer components

function LinkItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => cx("nav-link", isActive && "is-active")}>
      {label}
    </NavLink>
  );
}

// HamburgerButton moved to components/ui/HamburgerButton

type NavItem = { to: string; label: string };

function MobileMenu({ open, items }: { open: boolean; items: readonly NavItem[] }) {
  return (
    <div
      id="mobile-menu"
      className={cx(
        "md:hidden overflow-hidden transition-[max-height] duration-300",
        open ? "max-h-64" : "max-h-0",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 pb-4 flex flex-col gap-2">
        {items.map((it) => (
          <LinkItem key={it.to} to={it.to} label={it.label} />
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Primary">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Go to home">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-white shadow" />
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              ユーザー管理アプリ
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((it) => (
            <LinkItem key={it.to} to={it.to} label={it.label} />
          ))}
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden">
          <HamburgerButton open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </nav>

      {/* Mobile menu panel */}
      <MobileMenu open={open} items={NAV_ITEMS} />
    </header>
  );
}