import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DomeGallery from "../../components/DomeGallery"
import axios from "axios"
import "/src/App.css"

const SignIn = () => {
  let navigate = useNavigate()
  const initialState = { username: "", password: "" }

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
      <DomeGallery />
      <div className="signin-page">
        <div className="signin-box">
          <h2>Sign In</h2>
          <form className="signin" onSubmit={handleSubmit}>
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
            <button disabled={!formValues.username || !formValues.password}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
