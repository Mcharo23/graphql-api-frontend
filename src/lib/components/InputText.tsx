import { ChangeEvent, FC } from "react";

type CustomInputTexProps = {
  type: string;
  borderRadius: number;
  border: string;
  padding: number;
  width: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const CustomInputText: FC<CustomInputTexProps> = ({
  border,
  borderRadius,
  onChange,
  padding,
  placeholder,
  type,
  width,
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type={type}
      style={{
        borderRadius: borderRadius,
        border: border,
        padding: padding,
        width: width,
      }}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
};

export default CustomInputText;
