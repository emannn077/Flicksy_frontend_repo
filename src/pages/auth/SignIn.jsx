import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DomeGallery from "../../components/DomeGallery"
import axios from "axios"
import "/src/App.css"

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: "", password: "" })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/sign-in",
        formValues
      )

      if (res.status === 200) {
        const { token, user } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user_id", user._id)
        setUser(user)
        setFormValues({ username: "", password: "" })
        // to go profile page
        navigate("/profile")
      }
    } catch (err) {
      console.error("Sign-in failed:", err)
      alert("Invalid credentials or server error.")
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
