import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-cream-50" : "text-brown-900";
  const subTextColor = variant === "light" ? "text-cream-200" : "text-brown-500";
  const iconColor = variant === "light" ? "fill-cream-50" : "fill-brown-800";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Icone SVG : Épi de blé stylisé à 3 branches */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M24 44C24 44 26 38 26 28C26 18 22 12 24 4C26 12 30 18 30 26C30 34 26 40 26 44H24Z"
          className={iconColor}
        />
        <path
          d="M22 42C22 42 20 36 16 30C12 24 12 16 16 10C14 16 10 22 12 30C14 38 20 42 22 42Z"
          className={iconColor}
          fillOpacity="0.8"
        />
        <path
          d="M26 42C26 42 28 36 32 30C36 24 36 16 32 10C34 16 38 22 36 30C34 38 28 42 26 42Z"
          className={iconColor}
          fillOpacity="0.8"
        />
        {/* Lien / Nœud en bas */}
        <path
           d="M20 38H28L24 44L20 38Z"
           className={iconColor}
        />
      </svg>

      <div className="flex flex-col justify-center">
        <span className={cn("font-serif font-bold text-xl leading-none tracking-tight", textColor)}>
          Aux 3 Saveurs
        </span>
        <span className={cn("text-[10px] uppercase tracking-[0.2em] font-medium mt-1", subTextColor)}>
          Artisan • Avranches
        </span>
      </div>
    </div>
  );
}
