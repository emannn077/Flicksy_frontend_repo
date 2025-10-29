import { useEffect, useState } from 'react'
import axios from 'axios'
import './ChallengeList.css'

import { useNavigate } from 'react-router-dom'

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([])
  const [randomChallenge, setRandomChallenge] = useState(null)
  const navigate = useNavigate()

  const fetchChallenges = async () => {
    const res = await axios.get('http://localhost:3001/challenge')

    const now = new Date()
    const filtered = res.data.filter((ch) => {
      const created = new Date(ch.createdAt)
      const hoursDiff = (now - created) / (1000 * 60 * 60)
      return hoursDiff < 24
    })
    setChallenges(filtered)
  }

  useEffect(() => {
    fetchChallenges()
  }, [])

  const pickRandomChallenge = () => {
    if (challenges.length === 0) return
    const randomIndex = Math.floor(Math.random() * challenges.length)
    setRandomChallenge(challenges[randomIndex])
  }

  //here i am adding playChallenge where if user clicks on any challenge it will take it to cameera page

  const playChallenge = () => {
    if (!randomChallenge) return
    navigate('/camera', { state: { randomChallenge } })
  }
  return (
    <div className="challenge-list-container">
      <h2 className="challenge-list-title">All Challenges (Last Hour)</h2>

      <ul className="challenge-list">
        {challenges.map((ch) => (
          <li
            key={ch._id}
            className="challenge-item"
            onClick={() => playChallenge(ch)}
          >
            <div className="challenge-info">
              <strong className="challenge-title">{ch.title}</strong>
              <p className="challenge-description">
                {ch.description} ({ch.points} points)
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={pickRandomChallenge}>Pick Random Challenge</button>

      {randomChallenge && (
        <div
          className="random-challenge-box"
          onClick={() => playChallenge(randomChallenge)}
        >
          <h3 className="random-challenge-title">Random Challenge Picked</h3>
          <div className="random-challenge-info">
            <strong className="challenge-title">{randomChallenge.title}</strong>
            <p className="challenge-description">
              {randomChallenge.description} ({randomChallenge.points} points)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChallengeList
