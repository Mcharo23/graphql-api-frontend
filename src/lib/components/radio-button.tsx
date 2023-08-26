import { FC } from "react";

type RadioButtonProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
};

const RadioButton: FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  const handleOnGenderChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value.target.value);
  };

  return (
    <label htmlFor="radio-button">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={handleOnGenderChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
