import { useNavigate } from 'react-router-dom'

const ChallengeCard = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/add-challenge')
  }

  const handleChallengeList = () => {
    navigate('/challenges')
  }
  return (
    <div>
      <button onClick={handleClick}>Add new challenge</button>
      <button onClick={handleChallengeList}>View all challenges</button>
    </div>
  )
}

export default ChallengeCard
