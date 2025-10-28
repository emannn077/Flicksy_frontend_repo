import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Home from "./components/Home"
import Header from "./components/Header"

import "./App.css"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear
  }

  useEffect(() => {
    const checkToken = () => {
      setUser()
    }
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
