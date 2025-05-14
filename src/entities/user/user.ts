import { Email } from './email'
import { UserStatus } from './user-status'

export class User {
  public readonly id: string
  public readonly name: string
  public readonly email: Email
  public readonly status: UserStatus

  constructor(params: {
    id: string
    email: string
    name?: string
    status?: UserStatus
  }) {
    this.id = params.id
    this.name = params.name ?? 'user'
    this.email = new Email(params.email)
    this.status = UserStatus.INACTIVE
  }
}
