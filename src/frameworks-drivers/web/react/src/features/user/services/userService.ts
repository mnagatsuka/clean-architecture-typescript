import { fetcher } from '../../../lib/fetcher'
import type { UserInput, UserResponse } from '../types'

export async function createUser(data: UserInput, apiUrl: string): Promise<UserResponse> {
  console.log('apiUrl', apiUrl)
  return fetcher<UserResponse>(`${apiUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
