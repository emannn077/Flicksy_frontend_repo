import { useNavigate } from "react-router-dom"

const Home = () => {
  let navigate = useNavigate()

  return (
    <>
      <div>
        <div className="signin-homepage">
          <button onClick={() => navigate("/signin")}>
            Get Started With Flicksy
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
