import { useEffect, useState } from "react"
import axios from "axios"
import Client from "../services/api"
import "../../public/stylesheet/challenge.css"
import { useNavigate } from "react-router-dom"

const ChallengeList = ({ user }) => {
  const [challenges, setChallenges] = useState([])
  const [randomChallenge, setRandomChallenge] = useState(null)
  const navigate = useNavigate()

  const fetchChallenges = async () => {
    const res = await Client.get("/challenge")

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

  const playChallenge = async (challenge) => {
    if (!challenge) return
    navigate("/camera", { state: { randomChallenge: challenge } })
  }

  return (
    <div className="challenge-list-container">
      <h2 className="challenge-list-title">Play Challenges</h2>

      <ul className="challenge-list">
        {challenges.map((ch) => (
          <li
            key={ch._id}
            className="challenge-item"
            onClick={() => playChallenge(ch)}
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && playChallenge(ch)}
          >
            <div className="challenge-info">
              <strong className="challenge-title">
                {ch.title}
                <span className="challenge-points">{ch.points} pts</span>
              </strong>
              <p className="challenge-description">{ch.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={pickRandomChallenge}>🎲 Pick Random Challenge</button>

      {randomChallenge && (
        <div
          className="random-challenge-box"
          onClick={() => playChallenge(randomChallenge)}
          tabIndex={0}
          onKeyPress={(e) =>
            e.key === "Enter" && playChallenge(randomChallenge)
          }
        >
          <h3 className="random-challenge-title">🎯 Random Challenge Picked</h3>
          <div className="random-challenge-info">
            <strong className="challenge-title">
              {randomChallenge.title}
              <span className="challenge-points">
                {randomChallenge.points} pts
              </span>
            </strong>
            <p className="challenge-description">
              {randomChallenge.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChallengeList
