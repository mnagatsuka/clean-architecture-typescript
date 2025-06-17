import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigContext } from '@frameworks-drivers/web/react/src/contexts/ConfigContext'

/**
 * QueryClientのユーティリティ関数
 * @param ui 
 * @param param1 
 * @returns 
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  {
    config = { apiUrl: 'https://api.example.com' },
    queryClient,
    ...renderOptions
  }: {
    config?: { apiUrl: string }
    queryClient?: QueryClient
  } = {}
) => {
  const _queryClient = queryClient ?? new QueryClient()
  return render(
    <ConfigContext.Provider value={config}>
      <QueryClientProvider client={_queryClient}>{ui}</QueryClientProvider>
    </ConfigContext.Provider>,
    renderOptions
  )
}
