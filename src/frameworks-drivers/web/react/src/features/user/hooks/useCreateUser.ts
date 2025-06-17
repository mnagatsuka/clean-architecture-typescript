import { useMutation } from '@tanstack/react-query'
import { createUser } from '../services/userService'
import type { UserInput, UserResponse } from '../types'
import { useConfig } from '../../../contexts/ConfigContext'

export function useCreateUser() {
  const { apiUrl } = useConfig()
  return useMutation<UserResponse, Error, UserInput>({
    mutationFn: (input) => createUser(input, apiUrl),
  })
}