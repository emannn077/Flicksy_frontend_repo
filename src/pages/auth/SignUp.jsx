import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignUp = () => {
  let navigate = useNavigate()
  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    profile_picture: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      "http://localhost:3001/auth/sign-up",
      formValues
    )
    if (response.status === 200) {
      setFormValues(initialState)
      navigate("/sign-in")
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-class">
            <label htmlFor="firstName">First Name :</label>
            <input
              type="text"
              name="firstName"
              placeholder="first name"
              onChange={handleChange}
              value={formValues.firstName}
              required
              autoComplete="firstName"
            />
          </div>

          <div className="input-class">
            <label htmlFor="lastName">last Name :</label>
            <input
              type="text"
              name="lastName"
              placeholder="last name"
              onChange={handleChange}
              value={formValues.lastName}
              required
              autoComplete="lastName"
            />
          </div>

          <div className="input-class">
            <label htmlFor="username">User Name :</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              value={formValues.username}
              required
              autoComplete="username"
            />
          </div>

          <div className="input-class">
            <label htmlFor="email">Your email :</label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={formValues.email}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="profile_picture">Image:</label>
            <input
              required
              type="text"
              name="profile_picture"
              onChange={handleChange}
              value={formValues.profile_picture}
            />
          </div>

          <div className="input-class">
            <label htmlFor="password">Your Password :</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={formValues.password}
              required
              autoComplete="off"
            />
          </div>

          <button
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.password === formValues.confirmPassword)
            }
          >
            Sign-Up
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUp
