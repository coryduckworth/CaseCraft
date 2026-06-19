import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
} as const;

export function Logo({ size = "md", className }: LogoProps) {
  const px = sizeMap[size];

  return (
    <Image
      src="/logo.png"
      alt="CaseCraft"
      width={px}
      height={px}
      className={cn("shrink-0", className)}
      priority={size === "lg"}
    />
  );
}
