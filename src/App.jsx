import { useState } from 'react'
import { Route, Routes } from 'react-router'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Home from './components/Home'
import Header from './components/Header'
import CameraPage from './pages/Camera'
import ChallengeCard from './components/ChallengeCard'
import ChallengeForm from './pages/ChallengeForm'
import ChallengeList from './pages/ChallengeList'
import './App.css'
const App = () => {
  return (
    <>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challengeCard" element={<ChallengeCard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/add-challenge" element={<ChallengeForm />} />
            <Route path="/challenges" element={<ChallengeList />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
