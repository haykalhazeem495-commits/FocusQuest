import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
  indicatorClassName?: string;
};

export function Progress({ value, className, indicatorClassName }: ProgressProps): JSX.Element {
  return (
    <div className={cn("relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/70", className)}>
      <div
        className={cn("h-full w-full origin-left rounded-full bg-primary transition-all duration-500 ease-out", indicatorClassName)}
        style={{ transform: `translateX(-${100 - Math.min(100, Math.max(0, value))}%)` }}
      />
    </div>
  );
}
