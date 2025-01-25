import { FaUserCircle, FaChartBar, FaClipboardList, FaCreditCard } from "react-icons/fa";
import DashboardMenu from "../shared/DashboardMenu";

const ParticipantMenu = () => {
    const menuItems = [
        { label: "Analytics", path: "/dashboard/analytics", icon: FaChartBar },
        { label: "Participant Profile", path: "/dashboard/participant-profile", icon: FaUserCircle },
        { label: "Registered Camps", path: "/dashboard/registered-camps", icon: FaClipboardList },
        { label: "Payment History", path: "/dashboard/payment-history", icon: FaCreditCard },
    ];

    return <DashboardMenu menuItems={menuItems} role="Participant" />;
};

export default ParticipantMenu;
