import '@test/setup'
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@test/mocks/node';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// MSW サーバーを起動
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 各テスト後にハンドラーをリセットし、DOM をクリーンアップ
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// 全テスト後に MSW サーバーを停止
afterAll(() => server.close());
