import { fetcher } from '../../../lib/fetcher'
import type { UserInput, UserResponse } from '../types'

export async function createUser(data: UserInput): Promise<UserResponse> {
  return fetcher<UserResponse>('https://api.example.com/users', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
