import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { UserCreatePage } from '@/src/frameworks-drivers/web/react/src/pages/CreateUserPage'
import { renderWithProviders } from '@test/utils/render-with-providers'

describe('UserCreatePage', () => {
  it('creates a user successfully when the form is filled and submitted', async () => {
    renderWithProviders(<UserCreatePage />)

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Taro' } })
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } })

    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/user created successfully/i)
    })
  })

  it('displays a validation error when input is insufficient', async () => {
    renderWithProviders(<UserCreatePage />)

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: '' } })
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: '' } })

    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/failed to create/i)
    })
  })

  it('displays an error when an email with a blocked domain is entered', async () => {
    renderWithProviders(<UserCreatePage />)

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'ErrorUser' } })
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@error.com' } })

    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/failed to create/i)
    })
  })
})
