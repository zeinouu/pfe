import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";
import { useContext } from "react"; 

function  PrivateRoute({ elemSent: Element,children, ...rest }) {
  const { user } = useContext(AuthContext); // use the useContext hook to get the user value
  return (

        user ? (
          children
        ) : (
          <Navigate to="/login" replace />
        ))
      
    
  
}

export default PrivateRoute;