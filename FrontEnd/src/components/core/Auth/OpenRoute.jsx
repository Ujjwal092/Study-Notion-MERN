// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  //Yaha Redux store se auth state ka token nikala ja raha hai.
  const { token } = useSelector((state) => state.auth);

  if (token === null) {
    return children;
    // user login nahi hai page access allowed
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
} //if user login navigate toh dashboard acess allowed

export default OpenRoute;
