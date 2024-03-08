import z from "zod";

export const registerSchema = z
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