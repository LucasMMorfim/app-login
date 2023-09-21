import bcrypt from 'bcryptjs';
import { UsersRepository } from '@/repositories/users-repository'

interface UserData {
  email: string
  password: string
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: UserData) {
    const user = await this.usersRepository.login(email)

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password_hash)  //TODO perguntar pro luiz da onde esta pegando esse password_hash

      if (isPasswordValid) {
        const userId = Number(user.id)
        const token = await this.usersRepository.generateToken(userId, user)
        return { user, token }
      }
    }

    return null
  }
}
