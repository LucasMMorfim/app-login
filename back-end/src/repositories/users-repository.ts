import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  login(email: string): Promise<User | null>
  generateToken(userId: number, user: User): Promise<string>
}
