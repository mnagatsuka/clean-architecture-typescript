import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// biome-ignore lint/suspicious/noExplicitAny: msw bug: https://github.com/mswjs/msw/issues/2130
export const worker = setupWorker(...(handlers as any))
