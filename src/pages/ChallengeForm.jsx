import { useState } from "react"
import axios from "axios"
import Client from "../services/api"
import { useNavigate } from "react-router-dom"
import "../../public/stylesheet/challenge.css"

const ChallengeForm = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    points: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    await Client.post("/challenge", formState)

    // Wait for animation to complete
    setTimeout(() => {
      setFormState({
        title: "",
        description: "",
        points: "",
      })
      navigate("/challenges")
    }, 300)
  }

  return (
    <form className="challenge-form" onSubmit={handleSubmit}>
      <h2>Add a new Challenge</h2>

      <label>Challenge Title</label>
      <input
        name="title"
        value={formState.title}
        onChange={handleChange}
        placeholder="Enter challenge title"
        required
      />

      <label>Description</label>
      <input
        name="description"
        value={formState.description}
        onChange={handleChange}
        placeholder="Describe your challenge"
        required
      />

      <label>Points</label>
      <input
        type="number"
        name="points"
        value={formState.points}
        onChange={handleChange}
        placeholder="5-10"
        min={5}
        max={10}
        required
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Challenge"}
      </button>
    </form>
  )
}

export default ChallengeForm
