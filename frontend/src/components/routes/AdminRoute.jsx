/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { getCurrentUser } from "../slices/user/userSlice";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = useSelector(getCurrentUser);

  if (user?._id && user.userRole === 'admin') {
    return children;
  } else {
    return <Navigate to='/login' />
  }
};

export default AdminRoute;
