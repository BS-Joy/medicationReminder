/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { getCurrentUser } from "../slices/user/userSlice";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = useSelector(getCurrentUser);
//   const userStatus = useSelector(getUserStatus);

//   if (userStatus === "loading") {
//     return <div>Loading...</div>;
//   }
  if (user === null) {
    return children
  } else if (user?.userRole === 'regular') {
    return <Navigate to='/' />
  } else {
    return <Navigate to='/admin' />
  }
};

export default PublicRoute;
