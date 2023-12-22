/* eslint-disable react/prop-types */
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const MedicationTable = ({ medications }) => {
  const notify = () => {
    console.log(medications);
  };
  return (
    <>
      <table
        className="w-full text-left border-collapse rounded w-overflow-x-auto "
        cellSpacing="0"
      >
        <tbody>
          <tr className="border-b border-slate-300">
            <th
              scope="col"
              className="h-12 text-center text-sm font-medium stroke-slate-700 text-slate-700 "
            >
              Sl
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-start text-sm font-medium stroke-slate-700 text-slate-700 "
            >
              Medicine Name
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-start text-sm font-medium stroke-slate-700 text-slate-700 "
            >
              Duration (day)
            </th>
            <th
              scope="col"
              className="h-12 px-6 text-start text-sm font-medium stroke-slate-700 text-slate-700 "
            >
              Action
            </th>
          </tr>
          {medications.length > 0
            ? medications.map((medication, index) => (
                <tr
                  key={medication._id}
                  className="border-b border-slate-200 shadow-md"
                >
                  <td className="h-12 text-center text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                    {index + 1}
                  </td>
                  <td className="h-12 px-6 text-start text-sm transition duration-300 break-words border-slate-200 stroke-slate-500 text-slate-500 ">
                    {medication.medicineName}
                  </td>
                  <td className="h-12 px-6 pl-16 text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                    {medication.duration}
                  </td>
                  <td className="h-12 px-6 text-start text-sm transition duration-300 border-slate-200 stroke-slate-500 text-slate-500 ">
                    <button onClick={notify}>
                      <FaEye color="blue" size={"20px"} />
                    </button>
                  </td>
                </tr>
              ))
            : (
                <tr>
                    <td colSpan='6' className="text-center italic text-red-400">No medication available. <Link to='/medication' className="text-blue-500">Add Medication</Link></td>
                </tr>
            )}
        </tbody>
      </table>
    </>
  );
};

export default MedicationTable;
