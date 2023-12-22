import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedications, getMedicationByUser } from "../slices/medication/medicationSlice";
import { getCurrentUser } from "../slices/user/userSlice";
import { createSchedule } from "../slices/schedule/scheduleSlice";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateSchedule = () => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineId, setMedicineId] = useState("");
  const [duration, setDuration] = useState('');
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState('');

  const user = useSelector(getCurrentUser);
  const medications = useSelector(getAllMedications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedicationByUser(user?._id));
  }, [dispatch, user]);

  const errorNotify = (msg) =>
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 900,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });

  const medicineNameHandle = (e) => {
    setMedicineName(e.target.value);
    const choosenMedicine = medications.find(medicine => medicine.medicineName === e.target.value);
    setMedicineId(choosenMedicine._id)
    setDuration(choosenMedicine.duration);
  }

  const durationHandle = (e) => {
    setDuration(e.target.value);
  }

  const timeHandle = (e) => {
    setTime(e.target.value);
  }

  const frequencyHandle = (e) => {
    setFrequency(e.target.value);
  }

  const submitHandle = async (e) => {
    e.preventDefault();

    const scheduleData = {
      userId: user?._id,
      medicineId: medicineId,
      medicineName: medicineName,
      duration: +duration,
      time: time,
      frequency: +frequency,
      enabled: true
    }
    try {
      await dispatch(createSchedule(scheduleData)).unwrap();
      setMedicineName('');
      setDuration('');
      setTime('');
      setFrequency('');
    } catch (err) {
      errorNotify(err.error)
    }
  }
    return (
      <div className="container mx-auto flex justify-center p-4 mb-8 sm:p-6">
        <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <form
        onSubmit={submitHandle}
        className="overflow-hidden w-[600px] bg-white rounded-md shadow-xl text-slate-500 shadow-slate-200 mt-8"
      >
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">Add Schedule</h3>
          </header>
          <div className="flex flex-col space-y-8">
            <div className="relative mt-6">
              <select
                onChange={medicineNameHandle}
                value={medicineName}
                name="medicineName"
                required
                className="relative w-full h-10 px-4 text-sm transition-all bg-white border rounded outline-none appearance-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-indigo-500 focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 invalid:focus:border-pink-500"
              >
                <option defaultValue=""></option>
                {
                  medications?.map(data => {
                    const medicine_name = data.medicineName;
                    if(data.userId === user?._id){
                      return <option key={data._id} value={medicine_name}>{medicine_name}</option>
                    }
                  })
                }
              </select>
              <label
                htmlFor="medicineName"
                className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent peer-invalid:peer-focus:text-pink-500"
              >
                Select Medicine
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-indigo-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-labelledby="title-04 description-04"
                role="graphics-symbol"
              >
                <title id="title-04">Arrow Icon</title>
                <desc id="description-04">Arrow icon of the select list.</desc>
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:focus:text-pink-500">
                <span>Select your medicine</span>
              </small>
            </div>
            <div className="relative my-6">
              <input
                onChange={durationHandle}
                value={duration}
                type="text"
                name="duration"
                required
                placeholder="Medicine Duration"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="duration"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Medicine Duration
              </label>
              <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:peer-focus:text-pink-500">
                <span>Enter medicine duration</span>
              </small>
            </div>
            <div className="relative my-6">
              <input
                onChange={timeHandle}
                value={time}
                type="time"
                name="time"
                required
                placeholder="Medicine Time"
                className="relative w-full h-10 px-4 text-sm placeholder-transparent transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:text-pink-500 focus:border-blue-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="time"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Intake Time
              </label>
              <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:peer-focus:text-pink-500">
                <span>Select intake time</span>
              </small>
            </div>
            <div className="relative my-6">
              <select
                onChange={frequencyHandle}
                value={frequency}
                name="frequency"
                required
                className="relative w-full h-10 px-4 text-sm transition-all bg-white border rounded outline-none appearance-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-indigo-500 focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 invalid:focus:border-pink-500"
              >
                <option defaultValue=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>

              <label
                htmlFor="frequency"
                className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-indigo-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent peer-invalid:peer-focus:text-pink-500"
              >
                Intake Frequency
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-indigo-500 peer-disabled:cursor-not-allowed"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-labelledby="title-04 description-04"
                role="graphics-symbol"
              >
                <title id="title-04">Arrow Icon</title>
                <desc id="description-04">Arrow icon of the select list.</desc>
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <small className="absolute flex justify-between w-full px-4 py-1 text-xs transition text-slate-400 peer-invalid:focus:text-pink-500">
                <span>Select intake frequency</span>
              </small>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-6 ">
          <button className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
    );
  };
  
  export default CreateSchedule;
  