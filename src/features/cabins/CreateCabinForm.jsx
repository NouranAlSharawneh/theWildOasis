import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input.jsx";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClint = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClint.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmint = (data) => {
    mutate(data);
  };

  const onError = (errors) => {
    // console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmint, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isPending}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isPending}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least greater than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isPending}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least greater than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isPending}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for the cabin"}
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isPending}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput disabled={isPending} id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
