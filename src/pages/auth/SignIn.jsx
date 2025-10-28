import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SignIn = () => {
  let navigate = useNavigate()
  const initialState = { email: "", password: "" }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      "http://localhost:3001/auth/sign-in",
      formValues
    )
    if (response.status === 200) {
      setFormValues(initialState)
      navigate("/")
    }
  }

  return (
    <>
      <div className="form-container">
        <form className="signin" onSubmit={handleSubmit}>
          <div className="input-class">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
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
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={formValues.password}
              required
              autoComplete="off"
            />
          </div>
          <button disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </>
  )
}

export default SignIn
