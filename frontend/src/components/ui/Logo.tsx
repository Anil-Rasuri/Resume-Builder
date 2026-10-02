import { BRAND } from "@/constants/brand";

interface LogoProps {
  size?: number;
  showName?: boolean;
  className?: string;
}

export default function Logo({ size = 40, showName = true, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        width={size}
        height={size}
        alt={`${BRAND.name} logo`}
        className="select-none"
        draggable={false}
      />
      {showName && (
        <span className="text-xl font-extrabold tracking-tight text-slate-900">
          {BRAND.name}
        </span>
      )}
    </span>
  );
}