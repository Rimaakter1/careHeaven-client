import { FaUserCircle, FaPlus, FaTasks, FaClipboardList, FaChartBar } from "react-icons/fa";
import DashboardMenu from "../shared/DashboardMenu";

const OrganizerMenu = () => {
    const menuItems = [
        { label: "Overview", path: "/dashboard/admin-overview", icon: FaChartBar  },
        { label: "Organizer Profile", path: "/dashboard", icon: FaUserCircle },
        { label: "Add A Camp", path: "/dashboard/add-camp", icon: FaPlus },
        { label: "Manage Camps", path: "/dashboard/manage-camps", icon: FaTasks },
        { label: "Manage Registered Camps", path: "/dashboard/manage-registered-camps", icon: FaClipboardList },
    ];

    return <DashboardMenu menuItems={menuItems} role="Admin" />;
};

export default OrganizerMenu;
