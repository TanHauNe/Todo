import styled from "styled-components";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Login = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumbers: [
        {
          number: "",
        },
      ],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
      facebook: string;
      twitter: string;
    };
    phoneNumbers: {
      number: string;
    }[];
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Container>
      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />
        {errors.username?.message}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              message: "Invalid",
            },
            validate: (fieldValue) => {
              return (
                fieldValue !== "hau123@gmail.com" || "Enter a different email"
              );
            },
          })}
        />
        {errors.email?.message}
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel is required" },
          })}
        />
        {errors.channel?.message}
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" {...register("social.twitter")} />
        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register("social.facebook")} />
        <div className="">
          <label htmlFor="">List of phone numbers</label>
          {fields.map((field, index) => (
            <div key={field.id} className="">
              <input
                type="text"
                {...register(`phoneNumbers.${index}.number`)}
              />
              {index > 0 && (
                <button onClick={() => remove(index)}>Remove</button>
              )}
            </div>
          ))}
          <button onClick={() => append({ number: "" })}>
            Add phone numbers
          </button>
        </div>
        <button>Submit</button>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
