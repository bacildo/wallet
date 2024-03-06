import { Link } from "react-router-dom";
import wallet from "../assets/wallet.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsInput from "../components/ErrorsInput";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "O campo nome completo é obrigatório!")
      .toLowerCase(),

    email: z
      .string()
      .min(1, "O campo email é obrigatório!")
      .email("Email inválido!")
      .toLowerCase(),
    password: z
      .string()
      .min(6, "A senha deve possuir no mínimo 6 caracteres!")
      .max(12, "A senha deve possuir no máximo 12 caracteres!"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve possuir no mínimo 6 caracteres!")
      .max(12, "A senha deve possuir no máximo 12 caracteres!"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas digitadas não correspondem!",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  function handleForm(data) {
    console.log(data);
  }
  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative">
      <Link to="/login">
        <IoArrowBackCircleOutline className="text-white absolute top-3 left-3 text-2xl  hover:text-teal-200" />
      </Link>
      <img src={wallet} alt="" className="w-44" />
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col justify-center gap-4 w-full text-2xl"
      >
        <Input
          type="text"
          placeholder="Full Name"
          register={register}
          name="fullName"
        />
        {errors.fullName && <ErrorsInput message={errors.fullName.message} />}
        <Input
          type="email"
          placeholder="Email"
          register={register}
          name="email"
        />
        {errors.email && <ErrorsInput message={errors.email.message} />}
        <Input
          type="password"
          placeholder="Password"
          register={register}
          name="password"
        />
        {errors.password && <ErrorsInput message={errors.password.message} />}
        <Input
          type="password"
          placeholder="Confirm Password"
          register={register}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <ErrorsInput message={errors.confirmPassword.message} />
        )}
        <Button type="submit" title="CONFIRM" />
      </form>
    </div>
  );
}
