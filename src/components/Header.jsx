import { NavLink } from 'react-router-dom'

const Header = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <>
        <header>
          <NavLink to="/feed">Feed</NavLink>
          <NavLink onClick={handleLogOut} to="/">
            Sign Out
          </NavLink>
        </header>
      </>
    )
  }

  const publicOptions = (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/sign-up">Sign Up</NavLink>
        <NavLink to="/sign-in">Sign In</NavLink>
      </header>
    </>
  )

  return (
    <header>
      <NavLink to="/"></NavLink>
      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Header
