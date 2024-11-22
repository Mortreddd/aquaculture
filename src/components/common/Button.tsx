import { forwardRef, HTMLAttributes, Ref } from "react";
import LoadingCircle from "../LoadingCircle";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  ref: Ref<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  loading?: boolean;
}

const variantStyles: Record<string, string> = {
  primary: "bg-blue-500 hover:bg-blue-600",
  secondary: "bg-secondary hover:bg-secondary/80",
  success: "bg-green-500 hover:bg-green-600",
  danger: "bg-red-500 hover:bg-red-600",
  warning: "bg-yellow-500 hover:bg-yellow-600",
  info: "bg-teal-500 hover:bg-teal-600",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "secondary",
      loading = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        className={`btn ${variantStyles[variant]} transition-colors duration-200 ease-in-out text-white ${className}`}
        {...rest}
      >
        {loading ? <LoadingCircle /> : children}
      </button>
    );
  }
);

export default Button;
