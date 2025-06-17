import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@test/utils/render-with-providers'
import { CreateUserForm } from '@react/features/user/components/CreateUserForm'

describe('CreateUserForm (Integration)', () => {
  it('submits form and shows success message', async () => {
    renderWithProviders(<CreateUserForm />)

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Taro' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'taro@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      // role="status" による検証
      expect(screen.getByRole('status')).toHaveTextContent(/user created successfully/i)
    })
  })

  it('shows validation error when fields are empty', async () => {
    renderWithProviders(<CreateUserForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/failed to create/i)
    })
  })

  it('shows 403 error message for invalid email domain', async () => {
    renderWithProviders(<CreateUserForm />)

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Taro' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'taro@error.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/failed to create/i)
    })
  })

  it('disables button and shows loading text while submitting', async () => {
    renderWithProviders(<CreateUserForm />)

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Hanako' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'hanako@example.com' },
    })

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
      expect(screen.getByText('Submitting...')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/user created successfully/i)
    })
  })
})
