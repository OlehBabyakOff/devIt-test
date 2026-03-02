import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "./core/Button";
import { Input } from "./core/Input";

import { requestSchema } from "@schemas/request";

interface RequestFormProps {
  // TODO update response type
  onSubmit: (input: number) => Promise<any>;

  // TODO update response type
  onResponse: (response: any) => void;
}

export const RequestForm = ({ onSubmit, onResponse }: RequestFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ input: number }>({ resolver: yupResolver(requestSchema) });

  const submitForm = async (data: { input: number }) => {
    const response = await onSubmit(data.input);

    onResponse(response);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex items-center space-x-4 w-full max-w-md"
    >
      <div className="flex-1 flex flex-col">
        <Input
          {...register("input")}
          placeholder="Enter number from 0 to 100"
          className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition outline-none"
        />
        {errors.input && (
          <p className="text-red-600 text-base font-medium mt-1">
            {errors.input.message || ""}
          </p>
        )}
      </div>

      <div className="ml-2 flex items-center h-full">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-6 py-3 rounded-lg transition-colors shadow-md"
        >
          Send request
        </Button>
      </div>
    </form>
  );
};
