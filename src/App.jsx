import { useState, useEffect } from "react"
import { Route, Routes } from "react-router"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import Home from "./components/Home"
import Header from "./components/Header"
import CameraPage from "./pages/Camera"
import ChallengeCard from "./components/ChallengeCard"
import ChallengeForm from "./pages/ChallengeForm"
import ChallengeList from "./pages/ChallengeList"
import DomeGallery from "./components/DomeGallery"
import Comment from "./components/Comment"
import ProfilePage from "./pages/ProfilePage"
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
            <Route path="/challengeCard" element={<ChallengeCard />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/add-challenge" element={<ChallengeForm />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/comment" element={<Comment />} />

            {/* <Route path={`/user/${user._id}`} element={<Profile />} /> */}
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
