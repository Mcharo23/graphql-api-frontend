import { FC } from "react";

type CustomButtonProps = {
  name: string;
  backgroundColor: string;
  color: string;
  width: string;
  height: string;
  borderRadius: number;
  border: string;
  onClick: () => void;
};

const CustomButton: FC<CustomButtonProps> = ({
  backgroundColor,
  border,
  borderRadius,
  color,
  height,
  onClick,
  width,
  name,
}) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        color: color,
        width: width,
        height: height,
        borderRadius: borderRadius,
        border: border,
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CustomButton;
