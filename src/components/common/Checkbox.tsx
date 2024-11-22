import { forwardRef, HTMLAttributes } from "react";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  isChecked?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ variant = "secondary", isChecked, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        checked={isChecked}
        className={`checkbox checkbox-${variant}`}
        {...rest}
      />
    );
  }
);

export default Checkbox;
