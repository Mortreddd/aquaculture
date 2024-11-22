import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`${className} input input-bordered input-md`}
        {...rest}
      />
    );
  }
);

export default Input;
