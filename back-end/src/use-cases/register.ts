import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, passwordConfirmation }: registerUseCaseRequest) {
    
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    
    if (password !== passwordConfirmation) {
      throw new Error('Invalid passwords')
    }
    else {
      const password_confirmation = true
      const password_hash = await hash(password, 6)

      await this.usersRepository.create({
        name,
        email,
        password_hash,
        password_confirmation
      })
    }
  }
}
