import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "./core/Button";
import { Input } from "./core/Input";

import { requestSchema } from "@schemas/request";

export const RequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ input: number }>({ resolver: yupResolver(requestSchema) });

  const onSubmit = (data: { input: number }) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register("input")}
          placeholder="Enter number from 0 to 100"
        />
        {errors.input && (
          <p className="text-red-500 text-sm- mt-1">{errors.input.message}</p>
        )}
      </div>

      <Button type="submit" isLoading={isSubmitting}>
        Send request
      </Button>
    </form>
  );
};
