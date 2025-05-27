import { useMutation } from '@tanstack/react-query'
import { createUser } from '../services/userService'
import type { UserInput, UserResponse } from '../types'

export function useCreateUser() {
  return useMutation<UserResponse, Error, UserInput>({
    mutationFn: createUser,
  })
}
