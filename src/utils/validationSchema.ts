import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().nonempty({ message: 'Nome é obrigatório' }),

    email: z
      .string()
      .email({ message: 'Endereço de email inválido' })
      .nonempty({ message: 'Email é obrigatório' }),

    cellphone: z
      .string()
      .nonempty({ message: 'Número é obrigatório' })
      .refine(
        (val) =>
          /^(\+55)?\s?(\(?\d{2}\)?[\s.-]?)?[\d]{5}[\s.-]?[\d]{4}$/.test(val),
        { message: 'Número inválido' },
      ),

    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
      .nonempty({ message: 'Senha é obrigatória' }),

    confirmPassword: z
      .string()
      .nonempty({ message: 'Confirmação de senha obrigatória' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Confirmação de senha não confere',
    path: ['confirmPassword'],
  })

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Endereço de email inválido' })
    .nonempty({ message: 'Email é obrigatório' }),

  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .nonempty({ message: 'Senha é obrigatória' }),
})
