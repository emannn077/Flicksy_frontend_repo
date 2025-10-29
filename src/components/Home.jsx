import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
const Home = () => {
  let navigate = useNavigate()

  return (
    <>
      <NavLink />
      <div>
        <div className="signin-homepage">
          <button onClick={() => navigate("/sign-in")}>
            Get Started With Flicksy
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
