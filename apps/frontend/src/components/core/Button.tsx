import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
}

export const Button = ({
  isLoading = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "px-4 py-2 bg-gray-900 text-white rounded border-none cursor-pointer transition-opacity";

  const loadingStyle = "opacity-70 cursor-not-allowed";

  return (
    <button
      {...props}
      className={`${className ? className : baseStyle} ${isLoading ? loadingStyle : ""}`}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
