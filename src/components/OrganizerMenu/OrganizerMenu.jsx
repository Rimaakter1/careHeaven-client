import { FaUserCircle, FaPlus, FaTasks, FaClipboardList } from "react-icons/fa";
import DashboardMenu from "../../sharedComponents/DashboardMenu";

const OrganizerMenu = () => {
    const menuItems = [
        { label: "Organizer Profile", path: "/dashboard/organizer-profile", icon: FaUserCircle },
        { label: "Add A Camp", path: "/dashboard/add-camp", icon: FaPlus },
        { label: "Manage Camps", path: "/dashboard/manage-camps", icon: FaTasks },
        { label: "Manage Registered Camps", path: "/dashboard/manage-registered-camps", icon: FaClipboardList },
    ];

    return <DashboardMenu menuItems={menuItems} role="Admin" />;
};

export default OrganizerMenu;
