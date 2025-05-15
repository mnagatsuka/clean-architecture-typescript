import type { Hono } from "hono"

type FetchJsonOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: unknown
  headers?: Record<string, string>
}

export async function fetchHonoJson<T = unknown>(
  app: Hono,
  path: string,
  options: FetchJsonOptions = {}
): Promise<{ status: number; body: T }> {
  const method = options.method ?? "GET"

  // Node.js では absolute URL が必要
  const request = new Request(new URL(path, "http://localhost"), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const response = await app.fetch(request)
  const body: T = await response.json()
  return { status: response.status, body }
}