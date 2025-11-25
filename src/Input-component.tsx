import { forwardRef } from "react";

// We can extend the standard input props for better type safety and flexibility.
type InputComponentProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  (props, ref) => {
    return (
      <input
        {...props} // Spread all props from the parent
        ref={ref} // Forward the ref to the input element
        
      />
    );
  }
);

export default InputComponent;
