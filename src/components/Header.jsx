import { NavLink } from 'react-router-dom'

const Header = ({ user, handleLogOut }) => {
  return (
    <>
      {user ? (
        <nav className="flex flex-wrap gap-6 items-center p-4 bg-blue-500 text-white">
          <NavLink to="/home" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/profile" className="hover:underline">
            Profile
          </NavLink>
          <NavLink to="/camera" className="hover:underline">
            Camera
          </NavLink>
          <NavLink to="/challenges" className="hover:underline">
            Challenges
          </NavLink>
          <NavLink to="/add-challenge" className="hover:underline">
            Add Challenge
          </NavLink>
          <button
            onClick={handleLogOut}
            className="ml-auto bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </nav>
      ) : (
        <nav className="flex flex-wrap gap-6 items-center p-4 bg-gray-100 text-gray-700">
          <NavLink to="/" className="hover:underline">
            Welcome
          </NavLink>
          <NavLink to="/sign-in" className="hover:underline">
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className="hover:underline">
            Sign Up
          </NavLink>
        </nav>
      )}
    </>
  )
}

export default Header
