export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error ${res.status}: ${errorText}`)
  }

  return res.json()
}
