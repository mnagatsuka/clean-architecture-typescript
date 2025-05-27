import { Route, Routes } from 'react-router-dom'
import { UserCreatePage } from './pages/CreateUserPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserCreatePage />} />
    </Routes>
  )
}
