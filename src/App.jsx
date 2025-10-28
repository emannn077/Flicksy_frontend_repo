import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import CameraPage from './pages/Camera'
import ChallengeCard from './components/ChallengeCard'
import ChallengeForm from './pages/ChallengeForm'
import ChallengeList from './pages/ChallengeList'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChallengeCard />} />
        <Route path="/add-challenge" element={<ChallengeForm />} />
        <Route path="/challenges" element={<ChallengeList />} />
        <Route path="/camera" element={<CameraPage />} />
      </Routes>
    </>
  )
}

export default App
