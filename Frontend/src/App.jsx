import React from 'react'
import { Route, Routes } from 'react-router-dom'
import URLShortener from './components/URLShortener'
import AdminPage from './components/Admin'

function App() {
  return (
    <Routes>
      <Route path='/' element={<URLShortener/>}></Route>
      <Route path='/admin' element={<AdminPage/>}></Route>
    </Routes>
  )
}

export default App
