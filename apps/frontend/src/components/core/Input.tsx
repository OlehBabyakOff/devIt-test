import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, type = "number", ...props }: InputProps) => {
  const baseStyle =
    "px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <input
      type={type}
      {...props}
      className={className ? className : baseStyle}
    />
  );
};
