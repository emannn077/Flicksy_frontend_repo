import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DomeGallery from "../../components/DomeGallery"
import Client from "../../services/api.js"
import "../../../public/stylesheet/design.css"

const SignUp = () => {
  const navigate = useNavigate()

  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords must match.")
      return
    }

    try {
      const res = await Client.post("/auth/sign-up", {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      })

      if (res.status === 200) {
        setFormValues(initialState)
        navigate("/sign-in")
      }
    } catch (err) {
      console.error("Sign-up error:", err)
      setError("Failed to create account. Please try again.")
    }
  }

  return (
    <>
      <DomeGallery />
      <div className="signin-page">
        <div className="signin-container">
          {/* Brand Section */}
          <div className="signin-brand">
            <div className="brand-icon">📸</div>
            <h1 className="brand-name">Flicksy</h1>
            <p className="brand-tagline">Create Your Account</p>
          </div>

          {/* Sign Up Box */}
          <div className="signin-box">
            <div className="signin-header">
              <h2>Sign Up</h2>
              <p className="signin-subtitle">Join the community today</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="signin-form">
              {/* First Name */}
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <div className="input-class">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <div className="input-class">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="input-wrapper">
                <span className="input-icon">@</span>
                <div className="input-class">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <div className="input-class">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <div className="input-class">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <div className="input-class">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="signin-button"
                disabled={
                  !formValues.email ||
                  !formValues.password ||
                  formValues.password !== formValues.confirmPassword
                }
              >
                <span className="button-text">Sign Up</span>
                <span className="button-icon">→</span>
              </button>
            </form>

            {/* Footer */}
            <div className="signin-footer">
              <p className="footer-text">
                Already have an account?
                <button
                  onClick={() => navigate("/sign-in")}
                  className="link-button"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
