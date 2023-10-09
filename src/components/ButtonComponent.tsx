import { IButton } from "@/types/Common.type";
import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  htmlType,
  type,
  content,
  onClick,
  ...props
}: IButton) => {
  return (
    <Button
      onClick={onClick}
      htmlType={htmlType || "button"}
      type={type || "primary"}
      {...props}
    >
      {content}
    </Button>
  );
};

export default ButtonComponent;
