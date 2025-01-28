import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const DashboardMenu = ({ menuItems, role }) => {

    const { logOut } = useAuth();
    const handleLogout = () => {
        logOut();
    };
    return (
        <div className="flex flex-col min-h-screen w-full lg:w-64 bg-[#10273D] text-white">
            <div className="py-6 text-center border-b border-gray-600">
                <h2 className="text-2xl font-semibold">{role} Dashboard</h2>
            </div>

            <nav className="flex-grow mt-4 px-4">
                <ul className="space-y-4">
                    {menuItems.map(({ label, path, icon: Icon }, index) => (
                        <li key={index}>
                            <Link
                                to={path}
                                className="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-[#0495FF]"
                            >
                                <Icon className="mr-3 text-xl" /> {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="px-4 py-6 text-center border-t border-gray-600">
                <button onClick={handleLogout} className="w-full py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashboardMenu;
