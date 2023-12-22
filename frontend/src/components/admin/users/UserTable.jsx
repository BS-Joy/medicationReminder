/* eslint-disable react/prop-types */


const UserTable = ({allUser}) => {
    const dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
  return (
    <>
      <table className="table-auto w-full bg-white">
        <thead>
          <tr>
            <th className="border py-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
              />
            </th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">User Role</th>
            <th className="border px-4 py-2">Account Created</th>
            <th className="border px-4 py-2">Last Update</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUser ? (
            allUser.map((user) => {
              return (
                <tr key={user._id}>
                  <td className="border px-4 py-2">
                    <div className="flex items-center justify-center h-full">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                      />
                    </div>
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.userRole}</td>
                  <td className="border px-4 py-2">
                    {new Date(user.createdAt).toLocaleString(
                      "en-Bd",
                      dateOptions
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(user.updatedAt).toLocaleString(
                      "en-Bd",
                      dateOptions
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center justify-center">
                        <button className="mr-2 my-2 inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
                          <span>Update</span>
                        </button>
                        <button className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none">
                          <span>Delete User</span>
                        </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center italic text-red-400">
                No User available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
