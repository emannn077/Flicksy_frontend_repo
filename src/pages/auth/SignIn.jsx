import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DomeGallery from "../../components/DomeGallery"
import axios from "axios"
import "../../../public/stylesheet/style.css"

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

        setTimeout(() => navigate("/profile"), 100)
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
        <div className="signin-container">
          <div className="signin-box">
            <div className="signin-header">
              <h2>Sign In</h2>
              <p className="signin-subtitle">Continue your journey</p>
            </div>

            <form className="signin-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <div className="input-icon">👤</div>
                <div className="input-class">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    value={formValues.username}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <div className="input-icon">🔒</div>
                <div className="input-class">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formValues.password}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="signin-button"
                disabled={!formValues.username || !formValues.password}
              >
                <span className="button-text">Sign In</span>
                <span className="button-icon">→</span>
              </button>
            </form>

            <div className="signin-footer">
              <p className="footer-text">
                Don't have an account?
                <button
                  className="link-button"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
