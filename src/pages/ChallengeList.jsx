import { useEffect, useState } from 'react'
import axios from 'axios'
import './ChallengeList.css'

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([])
  const [randomChallenge, setRandomChallenge] = useState(null)

  const fetchChallenges = async () => {
    const res = await axios.get('http://localhost:3001/challenge')

    const now = new Date()
    const filtered = res.data.filter((ch) => {
      const created = new Date(ch.createdAt)
      const hoursDiff = (now - created) / (1000 * 60 * 60)
      return hoursDiff < 1
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

  return (
    <div className="challenge-list">
      <h2>All Challenges</h2>

      <ul>
        {challenges.map((ch) => (
          <li key={ch._id}>
            <span>
              <strong>{ch.title}</strong> - {ch.description} ({ch.points}{' '}
              points)
            </span>
          </li>
        ))}
      </ul>

      <button onClick={pickRandomChallenge}>Pick Random Challenge</button>

      {randomChallenge && (
        <div className="random-challenge">
          <h3>Random Challenge Picked</h3>
          <strong>{randomChallenge.title}</strong>:{' '}
          {randomChallenge.description} ({randomChallenge.points} points)
        </div>
      )}
    </div>
  )
}

export default ChallengeList
