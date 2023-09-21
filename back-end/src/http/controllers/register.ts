import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().refine((name) => name.trim().length > 0, { message: 'O nome não pode estar vazio.' }),
    email: z.string().email({ message: 'Email inválido.' }),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6)
  })
  
  const { name, email, password, passwordConfirmation } = registerBodySchema.parse(request.body)
  
  if (password.length < 6) {
    return reply.status(400).send({ message: 'Senha deve conter pelo menos 6 caracteres.' })
  }
  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
      passwordConfirmation
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  reply.code(201).send('Usuário Cadastrado')
}
