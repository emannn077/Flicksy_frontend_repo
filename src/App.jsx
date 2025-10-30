import { useState, useEffect } from "react"
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
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
import PostDetail from "./pages/PostDetail"
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
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Invalid stored user:", error)
        setUser(null)
      }
    }

    setLoadingUser(false)
  }, [])

  // ✅ Redirect to /profile after login
  useEffect(() => {
    if (user) {
      navigate("/profile")
    }
  }, [user])

  return (
    <>
      <div>
        <Header user={user} handleLogOut={handleLogOut} />
        <main>
          {loadingUser ? (
            <p>Loading...</p>
          ) : user ? (
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
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
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
              <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
            </Routes>
          )}
        </main>
      </div>
    </>
  )
}

export default App
