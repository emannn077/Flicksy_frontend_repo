import { NavLink } from "react-router-dom"
import {
  Home,
  User,
  Camera,
  Trophy,
  PlusCircle,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react"
import "../../public/stylesheet/camera.css"

const Header = ({ user, handleLogOut }) => {
  return (
    <header className="header">
      <div className="header-container">
        {user ? (
          <>
            {/* Logo/Brand */}
            <div className="header-brand">
              <div className="brand-icon-wrapper">
                <Camera className="brand-icon" />
              </div>
              <span className="brand-text">Flicksy</span>
            </div>

            {/* Navigation Links */}
            <nav className="header-nav">
              <NavLink to="/home" className="nav-link">
                <Home className="nav-icon" />
                <span className="nav-text">Home</span>
              </NavLink>
              <NavLink to="/profile" className="nav-link">
                <User className="nav-icon" />
                <span className="nav-text">Profile</span>
              </NavLink>
              <NavLink to="/camera" className="nav-link">
                <Camera className="nav-icon" />
                <span className="nav-text">Camera</span>
              </NavLink>
              <NavLink to="/challenges" className="nav-link">
                <Trophy className="nav-icon" />
                <span className="nav-text">Challenges</span>
              </NavLink>
              <NavLink to="/add-challenge" className="nav-link">
                <PlusCircle className="nav-icon" />
                <span className="nav-text">Add</span>
              </NavLink>
            </nav>

            {/* Logout Button */}
            <button onClick={handleLogOut} className="logout-btn">
              <LogOut className="btn-icon" />
              <span className="btn-text">Sign Out</span>
            </button>
          </>
        ) : (
          <>
            {/* Logo/Brand for logged out */}
            <div className="header-brand">
              <div className="brand-icon-wrapper">
                <Camera className="brand-icon" />
              </div>
              <span className="brand-text">Flicksy</span>
            </div>

            {/* Auth Navigation */}
            <nav className="header-nav-auth">
              <NavLink to="/" className="nav-link-auth">
                Welcome
              </NavLink>
              <NavLink to="/sign-in" className="nav-link-auth">
                <LogIn className="nav-icon-small" />
                Sign In
              </NavLink>
              <NavLink to="/sign-up" className="auth-signup-btn">
                <UserPlus className="nav-icon-small" />
                Sign Up
              </NavLink>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
