import type { Preview } from '@storybook/react'
import { worker } from '../../../../../test/mocks/browser'

if (typeof global.process === 'undefined') {
  // ブラウザ環境（Storybookでの実行時）でのみ起動
  worker.start({
    onUnhandledRequest: 'bypass', // 必要に応じて 'warn' などに変更
  })
}

const preview: Preview = {
  parameters: {
    // 必要に応じてパラメータ追加
  },
}

export default preview
