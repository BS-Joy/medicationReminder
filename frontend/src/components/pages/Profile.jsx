import { useSelector } from "react-redux";
import { getCurrentUser } from "../slices/user/userSlice";
import UserData from "../UserData";

const Profile = () => {
  const user = useSelector(getCurrentUser);
  return (
    <>
      <div className="max-w-md mx-auto bg-white border rounded-xl overflow-hidden md:max-w-2xl p-4 my-8 sm:p-6">
        <h1 className="text-center mb-6 text-4xl font-bold">
          Welcome to your profile
        </h1>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48 rounded-lg"
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your profile image URL
              alt="Profile"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Profile
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              Name: {user?._id ? user.name : "null"}
            </h1>
            <p className="mt-2 text-gray-500">
              Email: {user?._id ? user.email : "null"}
            </p>
            {/* <p className="mt-2 text-gray-500">Created At: {user?._id ? user.createdAt : 'null'}</p>
            <p className="mt-2 text-gray-500">Last Updated At: {user?._id ? user.updatedAt : 'null'}</p> */}
            <button className="mr-2 my-2 inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
              <span>Update Profile</span>
            </button>
            <button className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none">
              <span>Delete Profile</span>
            </button>
          </div>
        </div>
      </div>
      <UserData />
    </>
  );
};

export default Profile;
