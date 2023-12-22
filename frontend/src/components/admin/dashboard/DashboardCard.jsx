/* eslint-disable react/prop-types */
import wave from '../../../assets/wave.svg'

export default function DashboardCard({logo}) {
  return (
    <>
      {/*<!-- Component: Horizontal card--> */}
      <div className="flex relative items-center w-full bg-white rounded border shadow-md text-slate-500 shadow-slate-200 bg-cover p-6 sm:flex-row" style={{backgroundImage: `url(${wave})`}}>
            <div className=" w-[40%]">
                {logo}
            </div>
            <div>
              <p className="text-sm text-slate-400"> Total Number Of User</p>
              <h3 className="text-xl text-right font-medium text-slate-700">
                2
              </h3>
            </div>
      </div>
      {/*<!-- End Horizontal card--> */}
    </>
  )
}
