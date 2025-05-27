// test/integration/frameworks-drivers/web/react/features/user/components/CreateUserForm.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CreateUserForm } from '@react/features/user/components/CreateUserForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'

const renderWithProvider = () => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <CreateUserForm />
    </QueryClientProvider>
  )
}

describe('CreateUserForm (Integration)', () => {
  it('submits form and shows success message', async () => {
    renderWithProvider()

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Taro' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'taro@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Success! ID:'))).toBeInTheDocument()
    })
  })

  it('shows validation error when fields are empty', async () => {
    renderWithProvider()

    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(screen.getByText(/Failed to create/)).toBeInTheDocument()
    })
  })

  it('shows 403 error message for invalid email domain', async () => {
    renderWithProvider()

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Taro' },
    })
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'taro@error.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Create' }))

    await waitFor(() => {
      expect(screen.getByText(/Failed to create/)).toBeInTheDocument()
    })
  })

  it('disables button and shows loading text while submitting', async () => {
    renderWithProvider()

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
      expect(screen.getByText((text) => text.includes('Success! ID:'))).toBeInTheDocument()
    })
  })
})
