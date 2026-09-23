type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = (className?: string) => className ?? "h-5 w-5";

export function IconMenu({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M3 7h18M3 12h12M3 17h18" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

export function IconSearch({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" strokeLinecap="round" />
    </svg>
  );
}

export function IconUser({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5c1.2-3.6 4.1-5.5 7.5-5.5s6.3 1.9 7.5 5.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBag({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M5.5 8.5h13l-1 12h-11l-1-12Z" strokeLinejoin="round" />
      <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconHeart({
  className,
  filled = false,
  strokeWidth = 1.3,
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={base(className)}
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      <path
        d="M12 20s-7.5-4.6-9-9.2C2 7.6 4 5 6.8 5c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3C20 5 22 7.6 21 10.8 19.5 15.4 12 20 12 20Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArrowRight({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M4 12h15M14 6.5L19.5 12 14 17.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowLeft({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M20 12H5M10 6.5L4.5 12 10 17.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** High-contrast filled sun — large solid disc + thick rays for low vision. */
export function IconSun({ className, strokeWidth = 2.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="4.4" fill="currentColor" stroke="none" />
      <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" strokeLinecap="round" />
    </svg>
  );
}

/** High-contrast filled crescent moon — solid shape for low vision. */
export function IconMoon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" fill="currentColor" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowUpRight({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPlus({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function IconMinus({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function IconTrash({ className, strokeWidth = 1.1 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M4.5 7h15M9.5 7V4.8h5V7M6.5 7l1 13.2h9L17.5 7M10 10.5v6.5M14 10.5v6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className, strokeWidth = 1.4 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M4.5 12.5l5 5L19.5 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevron({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M6 9.5l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHanger({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M12 7.5a2.3 2.3 0 1 1 2.3-2.3M12 7.5v1.6" strokeLinecap="round" />
      <path d="M12 9.1L3.2 15.6a1 1 0 0 0 .6 1.8h16.4a1 1 0 0 0 .6-1.8L12 9.1Z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconScissors({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <circle cx="6" cy="6.5" r="2.5" />
      <circle cx="6" cy="17.5" r="2.5" />
      <path d="M8.2 8L20 17M8.2 16L20 7" strokeLinecap="round" />
    </svg>
  );
}

export function IconThread({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M12 21a9 9 0 1 1 9-9" strokeLinecap="round" />
      <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.4-2.6M12 3a9 9 0 0 0-5.5 1.9" strokeLinecap="round" />
      <path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconRuler({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <rect x="2.5" y="9" width="19" height="6" rx="0.5" />
      <path d="M6.5 9v3M10.5 9v2.2M14.5 9v3M18.5 9v2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconPin({ className, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} stroke="currentColor" strokeWidth={strokeWidth}>
      <path d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  );
}

/** House seal — monogram in a laurel ring. */
export function HouseSeal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className ?? "h-12 w-12"} stroke="currentColor" strokeWidth={1}>
      <circle cx="32" cy="32" r="30" opacity="0.5" />
      <circle cx="32" cy="32" r="24" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="17"
        fill="currentColor"
        stroke="none"
        fontFamily="Cormorant Garamond, serif"
        letterSpacing="1"
      >
        H&amp;C
      </text>
      <path d="M14 44c2.5-4 5-5.5 8-6M50 44c-2.5-4-5-5.5-8-6" strokeLinecap="round" />
    </svg>
  );
}
