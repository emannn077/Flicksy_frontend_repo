import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './ChallengeForm.css'

const ChallengeForm = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    points: ''
  })
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/challenge', formState)
    setFormState({
      title: '',
      description: '',
      points: ''
    })
    navigate('/challenges')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new Challenge</h2>

      <label>Title</label>
      <input
        name="title"
        value={formState.title}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <input
        name="description"
        value={formState.description}
        onChange={handleChange}
        required
      />

      <label>Points</label>
      <input
        type="number"
        name="points"
        value={formState.points}
        onChange={handleChange}
        min={5}
        max={10}
        required
      />

      <button type="submit">Add</button>
    </form>
  )
}

export default ChallengeForm
