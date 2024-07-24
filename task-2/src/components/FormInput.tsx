import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

const FormInput: React.FC<TextFieldProps> = (props) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field }) => <TextField {...field} />}
      control={control}
      name={props.name as string}
    />
  )
}

export default FormInput;