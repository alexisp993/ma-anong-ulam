import type { SVGProps } from "react";

// Hand-built icon set modeled on the project's `icon pack.png` reference
// sheet — 2px rounded outline, minimal, warm/friendly, matching its own
// "ICON STYLE" notes. Only glyphs actually used by the app are included;
// out-of-scope concepts (ratings, calories, cuisine, notifications, pantry
// stock levels, per-ingredient icons, etc.) were deliberately left out.

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function Icon({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// --- Navigation -------------------------------------------------------

export function HomeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h3v-5h6v5h3a1 1 0 0 0 1-1v-9" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </Icon>
  );
}

export function DiceIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function JarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 3h10" />
      <path d="M8 3v3.5L6 9v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9l-2-2.5V3" />
      <path d="M6 12h12" />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </Icon>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.6L21 8H6.2" />
    </Icon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 11c-2.5 4.4-9.5 9-9.5 9z" />
    </Icon>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      <path d="M10 12H3" />
      <path d="M6.5 8.5 3 12l3.5 3.5" />
    </Icon>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </Icon>
  );
}

export function PotIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 10h16" />
      <path d="M5 10v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6" />
      <path d="M2 8.5C2.5 7 4 7 4 8.5" />
      <path d="M22 8.5c-.5-1.5-2-1.5-2 0" />
      <path d="M9 5c.8.8.8 1.7 0 2.5" />
      <path d="M12 4c.8.8.8 1.9 0 2.7" />
      <path d="M15 5c.8.8.8 1.7 0 2.5" />
    </Icon>
  );
}

// --- Food categories ----------------------------------------------------

export function ChickenIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 14c-2.8-2.8-3.3-6.6-1-8.9 2.3-2.3 6.1-1.8 8.9 1 2.8 2.8 3.3 6.6 1 8.9-1 1-2.3 1.4-3.6 1.3" />
      <path d="M9 15c-1.8 1.8-3.5 2.2-4.5 1.2s-.6-2.7 1.2-4.5" />
      <circle cx="5.2" cy="18.8" r="1.6" />
    </Icon>
  );
}

export function PigIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="13" r="7" />
      <circle cx="12" cy="13.5" r="2.6" />
      <circle cx="10.6" cy="13.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="13.4" cy="13.5" r="0.5" fill="currentColor" stroke="none" />
      <path d="M7.5 8l1.2 2.2" />
      <path d="M16.5 8l-1.2 2.2" />
    </Icon>
  );
}

export function CowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 6.5c-1.5-1.2-3.2 0-2.7 2" />
      <path d="M17.5 6.5c1.5-1.2 3.2 0 2.7 2" />
      <circle cx="12" cy="13" r="6.5" />
      <path d="M8.5 19.5l.3-2.5" />
      <path d="M15.5 19.5l-.3-2.5" />
      <circle cx="9.7" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function FishIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12c3-4 8-6 12-6 3.5 0 6 2.5 6 6s-2.5 6-6 6c-4 0-9-2-12-6z" />
      <path d="M21 12l2-3v6z" />
      <circle cx="8" cy="11" r="0.7" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function CarrotIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3c3 3 5 7 5 10a5 5 0 0 1-10 0c0-3 2-7 5-10z" />
      <path d="M12 3v5" />
      <path d="M9.5 5l1.5 3" />
      <path d="M14.5 5l-1.5 3" />
    </Icon>
  );
}

export function EggIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3c4 4 6.5 9 6.5 12.5A6.5 6.5 0 0 1 5.5 15.5C5.5 12 8 7 12 3z" />
    </Icon>
  );
}

export function NoodleBowlIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 11h18" />
      <path d="M4 11a8 8 0 0 0 16 0" />
      <path d="M9 7c1-1.5 1-3 0-4" />
      <path d="M12 7c1-1.8 1-3.3 0-5" />
      <path d="M15 7c1-1.5 1-3 0-4" />
    </Icon>
  );
}

export function OthersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 14a8 8 0 0 1 16 0" />
      <path d="M2 14h20" />
      <path d="M2 17.5h20" />
      <circle cx="12" cy="4.5" r="1" fill="currentColor" stroke="none" />
      <path d="M12 5.5v2" />
    </Icon>
  );
}

// --- Action / UI ----------------------------------------------------------

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Icon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7" />
      <path d="M6 7l1 12.5A2 2 0 0 0 9 21h6a2 2 0 0 0 2-2.5L18 7" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </Icon>
  );
}

export function SaveIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h11l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M8 3v5h7V3" />
      <path d="M8 21v-6h8v6" />
    </Icon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9" />
    </Icon>
  );
}

export function XCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6" />
      <path d="M15 9l-6 6" />
    </Icon>
  );
}

export function LoadingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </Icon>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9L4 16" />
      <path d="M4 20v-4h4" />
    </Icon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </Icon>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6h9" />
      <path d="M17 6h3" />
      <circle cx="14" cy="6" r="2" />
      <path d="M4 12h3" />
      <path d="M11 12h9" />
      <circle cx="8" cy="12" r="2" />
      <path d="M4 18h9" />
      <path d="M17 18h3" />
      <circle cx="14" cy="18" r="2" />
    </Icon>
  );
}

// --- Planner --------------------------------------------------------------

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M4.2 4.2l1.4 1.4" />
      <path d="M18.4 18.4l1.4 1.4" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M4.2 19.8l1.4-1.4" />
      <path d="M18.4 5.6l1.4-1.4" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
    </Icon>
  );
}

// --- Recipe meta ------------------------------------------------------------

export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Icon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M15 14a6 6 0 0 1 6 6" />
    </Icon>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <path d="M6 7V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Icon>
  );
}

export function ChefHatIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 10a4 4 0 0 1 1-7.8A4 4 0 0 1 12 3a4 4 0 0 1 4-.8A4 4 0 0 1 17 10" />
      <path d="M7 10v6h10v-6" />
      <path d="M6 19h12" />
      <path d="M8 16v3" />
      <path d="M16 16v3" />
    </Icon>
  );
}

// --- Redesign additions -----------------------------------------------

export function LeafIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 20c0-8 5-13 16-14 1 10-4 15-12 15H4z" />
      <path d="M4 20c3-5 7-8 12-10" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 5l7 7-7 7" />
    </Icon>
  );
}

export function HelpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.1-2.5 3.6" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}
