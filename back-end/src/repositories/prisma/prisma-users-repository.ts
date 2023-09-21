import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

const secretKey = 'gfhgfdsfdsfdbfuyhgbfdhuyf';

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async login(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async generateToken(userId: number, user: User): Promise<string> {
    return jwt.sign({ userId, user }, secretKey, { expiresIn: '1h' });
  }
}
