import React from 'react'
import { Route, Routes } from "react-router-dom"

import Homepage from "./Pages/Homepage"
import Chat from "./Pages/Chat"

const App = () => {

  return (
    <>
      {/* route for homepage */}
      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<Chat />} />
      </Routes>
    </>
  )
}

export default App