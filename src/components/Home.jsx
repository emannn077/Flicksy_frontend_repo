import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import "/public/stylesheet/style.css"

const Home = () => {
  let navigate = useNavigate()

  return (
    <>
      <NavLink />

      <div className="home-page">
        <h1>Snap your day, slay your day.</h1>
        <h3> Share your life unfiltered</h3>
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
