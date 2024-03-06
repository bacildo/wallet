import { Link } from "react-router-dom";
import wallet from "../assets/wallet.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorsInput from "../components/ErrorsInput";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O campo email é obrigatório!")
    .email("Email inválido!")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha deve possuir no mínimo 6 caracteres!")
    .max(12, "A senha deve possuir no máximo 12 caracteres!"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  function handleForm(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
      <img src={wallet} alt="" className="w-44" />
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col items-center justify-center gap-4 w-full text-2xl"
      >
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
        <Button type="submit" title="Login" />
      </form>
      <p className="text-white text-2xl">
        Não possui uma conta?
        <Link to="/register" className="text-lime-300 hover:text-lime-500">
          Clique aqui!
        </Link>{" "}
      </p>
    </div>
  );
}
