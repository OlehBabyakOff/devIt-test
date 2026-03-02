import * as yup from "yup";

export const requestSchema = yup.object({
  input: yup
    .number()
    .typeError("Input value must be a number")
    .required("Input value is required")
    .min(0, "Min value is 0")
    .max(100, "Max value is 100"),
});
