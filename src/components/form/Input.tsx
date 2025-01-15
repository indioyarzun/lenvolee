import { FC, InputHTMLAttributes } from "react";

const Input: FC<{ label: string } & InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{label} :</label>
      <input
        className="my-2 w-full bg-accent/30 p-2"
        id={props.id}
        name={props.id}
        type={props.type}
        pattern={props.pattern}
        placeholder={props.placeholder ?? label}
      />
    </div>
  );
};

export default Input;
