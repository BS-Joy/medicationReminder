import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMedications,
  getMedicationByUser,
} from "./slices/medication/medicationSlice";
import {
  getAllSchedule,
  getScheduleByUser,
} from "./slices/schedule/scheduleSlice";
import { getCurrentUser } from "./slices/user/userSlice";
import ScheduleTable from "./schedule/ScheduleTable";
import MedicationTable from "./medication/MedicationTable";

export default function UserData() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });
  const dispatch = useDispatch();
  const medications = useSelector(getAllMedications);
  const schedules = useSelector(getAllSchedule);
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(getMedicationByUser(user?._id));
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getScheduleByUser(user?._id));
  }, [user, dispatch]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          });
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          });
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          });
        }
      }
    }
  };

  return (
    <>
      {/*<!-- Component: Basic base sized tab --> */}
      <div className="container mx-auto px-6">
        <section className="max-w-full" aria-multiselectable="false">
          <h1 className="text-center text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent underline font-bold my-4">
            Medications & Schedules
          </h1>
          <ul
            className="flex items-center border-b border-slate-200"
            role="tablist"
            ref={wrapperRef}
          >
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-5 text-sm font-medium tracking-wide transition duration-300 hover:bg-indigo-50 hover:stroke-indigo-600 focus:bg-indigo-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 1
                    ? "border-indigo-500 stroke-indigo-500 text-indigo-500 hover:border-indigo-600  hover:text-indigo-600 focus:border-indigo-700 focus:stroke-indigo-700 focus:text-indigo-700 disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-indigo-500 hover:text-indigo-500 focus:border-indigo-600 focus:stroke-indigo-600 focus:text-indigo-600 disabled:text-slate-500"
                }`}
                id="tab-label-1b"
                role="tab"
                aria-setsize="3"
                aria-posinset="1"
                tabIndex={`${tabSelected.currentTab === 1 ? "0" : "-1"}`}
                aria-controls="tab-panel-1b"
                aria-selected={`${
                  tabSelected.currentTab === 1 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 1 })
                }
              >
                <span className="relative">
                  Medications
                  <span className="inline-flex items-center justify-center gap-1 absolute bottom-4 right-[-1.5rem] rounded-full bg-indigo-500 px-1.5 text-sm text-white">
                    {medications.length}
                  </span>
                </span>
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={`-mb-px inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-5 text-sm font-medium tracking-wide transition duration-300 hover:bg-indigo-50 hover:stroke-indigo-600 focus:bg-indigo-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                  tabSelected.currentTab === 2
                    ? "border-indigo-500 stroke-indigo-500 text-indigo-500 hover:border-indigo-600  hover:text-indigo-600 focus:border-indigo-700 focus:stroke-indigo-700 focus:text-indigo-700 disabled:border-slate-500"
                    : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-indigo-500 hover:text-indigo-500 focus:border-indigo-600 focus:stroke-indigo-600 focus:text-indigo-600 disabled:text-slate-500"
                }`}
                id="tab-label-2b"
                role="tab"
                aria-setsize="3"
                aria-posinset="2"
                tabIndex={`${tabSelected.currentTab === 2 ? "0" : "-1"}`}
                aria-controls="tab-panel-2b"
                aria-selected={`${
                  tabSelected.currentTab === 2 ? "true" : "false"
                }`}
                onClick={() =>
                  setTabSelected({ ...tabSelected, currentTab: 2 })
                }
              >
                <span className="relative">
                  Schedules
                  <span className="inline-flex items-center justify-center gap-1 absolute bottom-4 right-[-1.5rem] rounded-full bg-indigo-500 px-1.5 text-sm text-white">
                    {schedules.length}
                  </span>
                </span>
              </button>
            </li>
            {/* <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-5 text-sm font-medium tracking-wide transition duration-300 hover:bg-indigo-50 hover:stroke-indigo-600 focus:bg-indigo-50 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected.currentTab === 3
                  ? "border-indigo-500 stroke-indigo-500 text-indigo-500 hover:border-indigo-600  hover:text-indigo-600 focus:border-indigo-700 focus:stroke-indigo-700 focus:text-indigo-700 disabled:border-slate-500"
                  : "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-indigo-500 hover:text-indigo-500 focus:border-indigo-600 focus:stroke-indigo-600 focus:text-indigo-600 disabled:text-slate-500"
              }`}
              id="tab-label-3b"
              role="tab"
              aria-setsize="3"
              aria-posinset="3"
              tabIndex={`${tabSelected.currentTab === 3 ? "0" : "-1"}`}
              aria-controls="tab-panel-3b"
              aria-selected={`${
                tabSelected.currentTab === 3 ? "true" : "false"
              }`}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 3 })}
            >
              <span>Tab 3</span>
            </button>
          </li> */}
          </ul>
          <div className="">
            <div
              className={`px-5 py-4 ${
                tabSelected.currentTab === 1 ? "" : "hidden"
              }`}
              id="tab-panel-1b"
              aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
              role="tabpanel"
              aria-labelledby="tab-label-1b"
              tabIndex="-1"
            >
              {/* <h1 className="text-center text-3xl underline font-bold">Medications</h1> */}
              <MedicationTable medications={medications} />
            </div>
            <div
              className={`px-5 py-4 ${
                tabSelected.currentTab === 2 ? "" : "hidden"
              }`}
              id="tab-panel-2b"
              aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
              role="tabpanel"
              aria-labelledby="tab-label-2b"
              tabIndex="-1"
            >
              {/* <h1 className="text-center text-3xl underline font-bold">Schedules</h1> */}
              <ScheduleTable schedules={schedules} />
            </div>
            {/* <div
            className={`px-5 py-4 ${
              tabSelected.currentTab === 3 ? "" : "hidden"
            }`}
            id="tab-panel-3b"
            aria-hidden={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
            role="tabpanel"
            aria-labelledby="tab-label-3b"
            tabIndex="-1"
          >
            <p>
              Even though there is no certainty that the expected results of our
              work will manifest, we have to remain committed to our work and
              duties; because, even if the results are slated to arrive, they
              cannot do so without the performance of work.
            </p>
          </div> */}
          </div>
        </section>
      </div>

      {/*<!-- End Basic base sized tab --> */}
    </>
  );
}
