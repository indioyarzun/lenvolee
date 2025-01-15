import { FC } from "react";

const TextArea: FC<{
  label: string;
  id: string;
  placeholder?: string;
}> = ({ label, id, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label} :</label>
      <textarea
        className="my-2 w-full bg-accent/30 p-2"
        id={id}
        name={id}
        placeholder={placeholder ?? label}
        rows={7}
      />
    </div>
  );
};

export default TextArea;
