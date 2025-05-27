import { http, HttpResponse, delay } from 'msw'

const apiUrl = 'https://api.example.com'

export const userHandlers = [
  http.post(`${apiUrl}/users`, async ({ request }) => {
    
    const body = await request.json() as { name?: string; email?: string }
    const { name, email } = body

    if (!name || !email) {
      return HttpResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      )
    }

    if (email.endsWith('@error.com')) {
      return HttpResponse.json(
        { message: 'Email domain not allowed' },
        { status: 403 }
      )
    }

    // 成功レスポンスの前に300ms待機
    await delay(300)

    return HttpResponse.json(
      { id: 'storybook-id', ...body },
      { status: 201 }
    )
  }),
]
