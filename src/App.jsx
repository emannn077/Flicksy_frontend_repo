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
import UserProfileEdit from "./pages/UserProfileEdit"

const App = () => {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate("/")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUser(payload)
      } catch (error) {
        console.error("Invalid token:", error)
        setUser(null)
      }
    }
    setLoadingUser(false)
  }, [])

  return (
    <>
      <div>
        <Header user={user} handleLogOut={handleLogOut} />
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
            <Route path="/sign-in" element={<SignIn setUser={setUser} />} />

            <Route path="/home" element={<Home />} />
            <Route
              path="/profile"
              element={<ProfilePage user={user} setUser={setUser} />}
            />
            <Route path="/edit-profile/:id" element={<UserProfileEdit />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route
              path="/challenges"
              element={<ChallengeList user={user} setUser={setUser} />}
            />
            <Route path="/add-challenge" element={<ChallengeForm />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/comment" element={<Comment user={user} />} />

            <Route path="/challengeCard" element={<ChallengeCard />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
