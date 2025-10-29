import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  let navigate = useNavigate()
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
    //profile_picture: "",
    //points: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormValues(initialState)
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
            <label htmlFor="email">Your email :</label>
            <input
              type="text"
              name="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={formValues.email}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-class">
            <label htmlFor="password">Your Password :</label>
            <input
              type="text"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={formValues.password}
              required
              autoComplete="off"
            />
          </div>

          <div className="input-class">
            <label htmlFor="confirmPassword">confirm Password :</label>
            <input
              type="text"
              name="confirmPassword"
              placeholder="confirmPassword"
              onChange={handleChange}
              value={formValues.confirmPassword}
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
