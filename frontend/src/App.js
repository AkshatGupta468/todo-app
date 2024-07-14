import React, { useEffect, useState,createContext } from "react"
import { Route } from "react-router-dom"

import Header from "./components/header/Header"
import About from "./components/page/About"
import Todos from "./components/todo/ViewTodos"
import AddTodo from "./components/todo/AddTodo"
import UpdateTodo from "./components/todo/UpdateTodo"
import Signin from "./components/auth/Signin"
import Signup from "./components/auth/Signup"
import Signout from "./components/auth/Signout"
import Landing from "./components/page/Landing"
import NotFound from "./components/page/NotFound"
import ViewStickyNotes from "./components/todo/ViewStickyNotes"
import { Routes } from "react-router-dom"

import './bootstrap.min.css';
import "./App.css"


const AuthContext = createContext({isAuthenticated:false,setIsAuthenticated :()=>{}})

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
    <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          />
        <Routes>
          <Route
            index
            element={
              <Landing
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
          <Route
            exact
            path="/signin"
            element={<Signin/>}
              />
          <Route
            exact
            path="/signup"
            element={<Signup/>}
            />
          <Route
            exact
            path="/signout"
            element={
              <Signout/>
            }
          />
          <Route
            exact
            path="/todo/*"
            element={
              <ViewStickyNotes/>
            }
          />
          <Route
            exact
            path="/update/:id"
            element={<UpdateTodo
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/stickynotes" element={<ViewStickyNotes />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
          </AuthContext.Provider>
  )
}

export {AuthContext}
export default App
