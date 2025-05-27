import type { Meta, StoryObj } from '@storybook/react'
import { CreateUserForm } from './CreateUserForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const meta: Meta<typeof CreateUserForm> = {
  component: CreateUserForm,
  title: 'Features/User/CreateUserForm',
  decorators: [
    (Story) => {
      // React Query用のQueryClientをストーリーごとに新規生成
      const queryClient = new QueryClient()
      return (
        <QueryClientProvider client={queryClient}>
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Story />
          </div>
        </QueryClientProvider>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof CreateUserForm>

// 単純なフォーム（APIリクエストは自動でMSWのMockに流れる）
export const Default: Story = {}
