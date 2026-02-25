import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import UserManagementApp from './components/UserManagementApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<UserManagementApp/>} />
    </Routes>
    </>
  )
}

export default App
