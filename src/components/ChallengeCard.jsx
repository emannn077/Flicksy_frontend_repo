import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChallengeCard.css'

const ChallengeCard = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState('add')

  const handleClick = (tab) => {
    setActive(tab)
    if (tab === 'add') navigate('/add-challenge')
    if (tab === 'list') navigate('/challenges')
  }

  return (
    <div className="challenge-card">
      <button
        className={`pill ${active === 'add' ? 'is-active' : ''}`}
        onClick={() => handleClick('add')}
      >
        Add new challenge
      </button>
      <button
        className={`pill ${active === 'list' ? 'is-active' : ''}`}
        onClick={() => handleClick('list')}
      >
        View all challenges
      </button>
    </div>
  )
}

export default ChallengeCard
