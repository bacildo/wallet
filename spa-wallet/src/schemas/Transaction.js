import { z } from "zod";

export const transactionSchema = z.object({
  value: z
    .string()
    .min(3, "O valor precisa ter no mínimo 3 caracteres")
    .transform((value) => Number(value)),
  descripition: z
    .string()
    .min(3, "A descrição precisa ter no mínimo 3 caracteres"),
});
