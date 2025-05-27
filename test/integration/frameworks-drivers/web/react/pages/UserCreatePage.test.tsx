import { describe, it, beforeAll, afterAll, afterEach, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserCreatePage } from '@/src/frameworks-drivers/web/react/src/pages/CreateUserPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'

// MSWのsetupなど必要であればここに記述（省略）

// QueryClientのユーティリティ関数（毎回新しく生成）
function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('UserCreatePage', () => {
  it('creates a user successfully when the form is filled and submitted', async () => {
    renderWithQueryClient(<UserCreatePage />)

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Taro' } })
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } })

    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument()
    })
  })

  it('displays a validation error when input is insufficient', async () => {
    renderWithQueryClient(<UserCreatePage />)

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: '' } })
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: '' } })

    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByText(/failed to create/i)).toBeInTheDocument()
    })
  })

  it('displays an error when an email with a blocked domain is entered', async () => {
    renderWithQueryClient(<UserCreatePage />)

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'ErrorUser' } })
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'user@error.com' } })

    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    await waitFor(() => {
      expect(screen.getByText(/failed to create/i)).toBeInTheDocument()
    })
  })
})
