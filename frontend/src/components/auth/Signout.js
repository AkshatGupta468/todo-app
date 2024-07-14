import React, { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"

function Signout() {
  let navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  useEffect(() => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("name")
    setIsAuthenticated(false)
    navigate("/")
  }, [navigate, setIsAuthenticated])

  return (
    <div className="text-center">
      <h1>Successfully sign out</h1>
    </div>
  )
}

export default Signout
