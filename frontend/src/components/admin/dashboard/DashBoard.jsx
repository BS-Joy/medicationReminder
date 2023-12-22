import DashboardCard from "./DashboardCard";
import { FaUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdOutlineSchedule } from "react-icons/md";
import { Link } from "react-router-dom";

const DashBoard = () => {
    const userLogo = <FaUser size='50px' color="#0099ff" />;
    const medicationLogo = <GiMedicines size='50px' color="#0099ff" />;
    const scheduleLogo = <MdOutlineSchedule size='50px' color="#0099ff" />;

    return (
        <div className="flex gap-2 container mx-auto p-5">
            <Link className="w-full">
                <DashboardCard logo={userLogo} />
            </Link>
            <Link className="w-full">
                <DashboardCard logo={medicationLogo} />
            </Link>
            <Link className="w-full">
                <DashboardCard logo={scheduleLogo} />
            </Link>
        </div>
    );
}

export default DashBoard;
