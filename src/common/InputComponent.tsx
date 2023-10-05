import { Controller } from "react-hook-form";
import { Input } from "antd";
import { IInput } from "@/app/types/Input.type";

const InputComponent = ({ name, control, placeholder, label }: IInput) => {
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input placeholder={placeholder} {...field} />}
      />
    </div>
  );
};

export default InputComponent;
