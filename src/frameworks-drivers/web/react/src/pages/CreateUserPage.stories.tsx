// src/frameworks-drivers/web/react/src/pages/UserCreatePage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { UserCreatePage } from './CreateUserPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const meta: Meta<typeof UserCreatePage> = {
  component: UserCreatePage,
  title: 'Pages/UserCreatePage',
  decorators: [
    (Story) => {
      const queryClient = new QueryClient()
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof UserCreatePage>

export const Default: Story = {}
