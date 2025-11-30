type Props = {
  open: boolean;
  onClick: () => void;
  ariaControlsId?: string;
  className?: string;
};

// Small util to join class names safely
const cx = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function HamburgerButton({
  open,
  onClick,
  ariaControlsId = "mobile-menu",
  className,
}: Props) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100",
        "dark:text-slate-200 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        className
      )}
      aria-controls={ariaControlsId}
      aria-expanded={open}
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <span aria-hidden="true" className="relative block h-4 w-6">
        <span
          className={cx(
            "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-200 ease-in-out",
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
          )}
        />
        <span
          className={cx(
            "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-200 ease-in-out",
            open
              ? "top-1/2 -translate-y-1/2 opacity-0"
              : "top-1/2 -translate-y-1/2 opacity-100"
          )}
        />
        <span
          className={cx(
            "absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-200 ease-in-out",
            open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
          )}
        />
      </span>
    </button>
  );
}

export default HamburgerButton;
