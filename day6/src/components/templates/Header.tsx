import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

// Small util to join class names
const cx = (...v: Array<string | false | null | undefined>) => v.filter(Boolean).join(" ");

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/login", label: "Login" },
  { to: "/user-management", label: "User Management" },
] as const;

const linkBase = "px-3 py-2 text-sm font-medium rounded-lg transition-colors";
const linkInactive =
  "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10";
const linkActive =
  "text-indigo-700 bg-indigo-50 ring-1 ring-inset ring-indigo-200 dark:text-white dark:bg-indigo-600/30 dark:ring-indigo-400/30";

function LinkItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cx(linkBase, isActive ? linkActive : linkInactive)}
    >
      {label}
    </NavLink>
  );
}

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-controls="mobile-menu"
      aria-expanded={open}
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <span aria-hidden="true" className="relative block h-4 w-6">
        <span
          className={cx(
            "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-200 ease-in-out",
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
          )}
        />
        <span
          className={cx(
            "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-200 ease-in-out",
            open ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2 opacity-100",
          )}
        />
        <span
          className={cx(
            "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-200 ease-in-out",
            open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
          )}
        />
      </span>
    </button>
  );
}

function MobileMenu({ open }: { open: boolean }) {
  return (
    <div
      id="mobile-menu"
      className={cx(
        "md:hidden overflow-hidden transition-[max-height] duration-300",
        open ? "max-h-64" : "max-h-0",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 pb-4 flex flex-col gap-2">
        {NAV_ITEMS.map((it) => (
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
      <MobileMenu open={open} />
    </header>
  );
}