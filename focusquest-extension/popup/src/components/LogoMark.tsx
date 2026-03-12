type LogoMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16"
};

export function LogoMark({ size = "md", className = "" }: LogoMarkProps): JSX.Element {
  const logoSrc = `${import.meta.env.BASE_URL}logo.jpeg`;

  return (
    <img
      src={logoSrc}
      alt="FocusQuest logo"
      className={`${sizes[size]} object-contain drop-shadow-[0_8px_16px_rgba(70,52,180,0.38)] ${className}`.trim()}
    />
  );
}