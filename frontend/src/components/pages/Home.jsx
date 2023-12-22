import { useDispatch, useSelector } from "react-redux";
import {
  getAllSchedule,
  getScheduleByUser,
} from "../slices/schedule/scheduleSlice";
import { useEffect } from "react";
import { getCurrentUser } from "../slices/user/userSlice";
import ScheduleTable from "../schedule/ScheduleTable";

export default function Home() {
  const dispatch = useDispatch();

  const user = useSelector(getCurrentUser);
  const schedules = useSelector(getAllSchedule);
  
  useEffect(() => {
    dispatch(getScheduleByUser(user?._id));
  }, [user, dispatch]);

  return (
    <>
      {/*<!-- Component: Underline Table --> */}
      <div className="w-full overflow-x-auto container mx-auto p-6">
        <h1 className="text-xl font-bold text-start my-3">
          Upcoming Reminders:
        </h1>
        <ScheduleTable schedules={schedules} />
      </div>
      {/*<!-- End Underline Table --> */}
    </>
  );
}
