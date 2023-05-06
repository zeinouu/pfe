import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'
import SignUp from './components/signup'
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from './components/Dashboard'
import Showdashboard from './components/Showdashboard'
import PrivateRoute from "./context/PrivateRoute"


function App() {
  return (
    <AuthContextProvider>
      <Router>
      <Routes>
      <Route
          path="/Dashboard"
          element={ <PrivateRoute  ><Dashboard /></PrivateRoute> 
        }/>
           <Route
          path="/Showdashboard"
          element={ <PrivateRoute  ><Showdashboard /></PrivateRoute> 
        }/>
          <Route path="/Showdashboard" element={<Showdashboard />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Login />} exact/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App