import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { LoginUseCase } from '@/use-cases/login'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  
  try {
    const { email, password } = request.body as { email: string; password: string };

    const usersRepository = new PrismaUsersRepository()
    const loginUseCase = new LoginUseCase(usersRepository)

    const result = await loginUseCase.execute({
      email,
      password
    })

    if (result) {
      reply.status(200).send({
        token: result.token,
        name: result.user.name,
        email: result.user.email,
        password: result.user.password_hash,
        createdAt: result.user.created_at,
      })
    } else {
      reply.status(401).send('Usuário não encontrado. Email ou senha incorretos.')
    }
  } catch (err) {
    console.log(err)
    return reply.status(400).send('Informações incorretas')
  }
}