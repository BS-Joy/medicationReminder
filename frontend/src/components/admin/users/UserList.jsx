import UserTable from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser, getAllUser } from "../../slices/user/userSlice";
import { useEffect } from "react";

const UsersList = () => {
  const allUser = useSelector(getAllUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);
  return (
    <div className="container mx-auto p-6">
      <div className="w-full pb-5">
        <h1>Total Users: {allUser.length} </h1>
      </div>
      <UserTable allUser={allUser} />
    </div>
  );
};

export default UsersList;
