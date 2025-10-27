import { useState } from "react"
import { Route, Routes } from "react-router-dom"

import "./App.css"
import CameraPage from "./pages/Camera"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/camera" element={<CameraPage />} />
      </Routes>
    </>
  )
}

export default App
