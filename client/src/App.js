import React from 'react'
import { Route, Routes } from "react-router-dom"


import Homepage from "./Pages/Homepage"
import Chat from "./Pages/Chat"

import "./style/App.css"

const App = () => {

  return (
    <div className='App'>
      {/* route for homepage */}
      <Routes>

        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App