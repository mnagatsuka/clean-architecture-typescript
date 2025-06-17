import { test, expect } from '@playwright/test'

test.describe('CreateUser E2E', () => {

  test.beforeEach(async ({ page, request }) => {
    // テストデータの初期化
    const res = await request.post('http://localhost:3031/__test/truncate')
    expect(res.ok()).toBeTruthy()
    await page.goto('/')
  })

  test('should allow user creation via form', async ({ page }) => {
    const email = 'test@example.com'
    const name = 'Alice'

    await page.getByRole('textbox', { name: 'Name' }).fill(name)
    await page.getByRole('textbox', { name: 'Email' }).fill(email)
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByRole('status')).toContainText('User created successfully')
  })

  test('should show error if email is already taken', async ({ page }) => {
    const email = 'duplicate@example.com'
    const name = 'Bob'

    // 1回目（成功）
    await page.getByRole('textbox', { name: 'Name' }).fill(name)
    await page.getByRole('textbox', { name: 'Email' }).fill(email)
    await page.getByRole('button', { name: 'Create' }).click()
    await expect(page.getByRole('status')).toContainText('User created successfully')

    // フォームリセット（リロード）
    await page.reload()

    // 2回目（重複エラー）
    await page.getByRole('textbox', { name: 'Name' }).fill(name)
    await page.getByRole('textbox', { name: 'Email' }).fill(email)
    await page.getByRole('button', { name: 'Create' }).click()
    await expect(page.getByRole('status')).toHaveText('Failed to create')
    // ※「already exists」など別テキストの場合は柔軟に調整
  })
})
