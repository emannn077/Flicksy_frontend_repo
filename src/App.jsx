<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Home from './components/Home'
import Header from './components/Header'
import CameraPage from './pages/Camera'
import ChallengeCard from './components/ChallengeCard'
import ChallengeForm from './pages/ChallengeForm'
import ChallengeList from './pages/ChallengeList'
import DomeGallery from './components/DomeGallery'
import ProfilePage from './pages/ProfilePage'
import './App.css'
=======
import { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router"
import Header from "./components/Header"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Welcome from "./pages/Welcome"
import CameraPage from "./pages/Camera"
import ChallengeCard from "./components/ChallengeCard"
import ChallengeForm from "./pages/ChallengeForm"
import ChallengeList from "./pages/ChallengeList"
import DomeGallery from "./components/DomeGallery"
import ProfilePage from "./pages/ProfilePage"
import Home from "./pages/Home"
import "./App.css"
>>>>>>> 0e671fabbbd674ecefd5233b615ea4181df2ba52

const App = () => {
  const [User, setUser] = useState(null)
  const navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate("/")
  }

  useEffect(() => {
<<<<<<< HEAD
    const checkToken = () => {
      setUser()
    }
    const token = localStorage.getItem('token')
=======
    const token = localStorage.getItem("token")
>>>>>>> 0e671fabbbd674ecefd5233b615ea4181df2ba52
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUser(payload)
      } catch (error) {
        console.error("Invalid token:", error)
        setUser(null)
      }
    }
  }, [])

  return (
    <>
      <div>
        <Header user={User} handleLogOut={handleLogOut} />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
            <Route path="/sign-in" element={<SignIn setUser={setUser} />} />

            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="/add-challenge" element={<ChallengeForm />} />
            <Route path="/challengeCard" element={<ChallengeCard />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
