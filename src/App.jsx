import { useState } from "react"
import { Route, Routes } from "react-router"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Home from "./components/Home"
import Header from "./components/Header"

import "./App.css"
import CameraPage from "./pages/Camera"

const App = () => {
  return (
    <>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/camera" element={<CameraPage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
