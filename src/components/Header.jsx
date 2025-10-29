import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </header>
    </>
  )
}

export default Header
