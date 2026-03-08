import { cn } from "@/lib/utils";

type SeparatorProps = {
  className?: string;
};

export function Separator({ className }: SeparatorProps): JSX.Element {
  return <div className={cn("h-px w-full bg-border", className)} role="separator" />;
}
