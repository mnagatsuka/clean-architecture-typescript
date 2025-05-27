import { useState } from 'react'
import { useCreateUser } from '../hooks/useCreateUser'

export function CreateUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const mutation = useCreateUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ name, email })
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow max-w-sm w-full">
      <h2 className="text-xl mb-4 font-bold">Create User</h2>
      <input
        placeholder="Name"
        className="border w-full mb-2 p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        className="border w-full mb-2 p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Submitting...' : 'Create'}
      </button>

      {mutation.isSuccess && <p className="mt-2 text-green-600">Success! ID: {mutation.data.id}</p>}
      {mutation.isError && <p className="mt-2 text-red-600">Failed to create</p>}
    </form>
  )
}
