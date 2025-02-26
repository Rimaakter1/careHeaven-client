import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { BsSun, BsMoon } from "react-icons/bs";
import { useState, useEffect } from "react";

const DashboardMenu = ({ menuItems, role }) => {
    const { logOut } = useAuth();
    const handleLogout = () => {
        logOut();
    };

    // Dark Mode State
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="flex flex-col min-h-screen w-full lg:w-64 bg-[#10273D] dark:bg-gray-900 text-white dark:text-gray-200 transition-colors duration-300">
            <div className="flex justify-between items-center p-4 border-b border-gray-600">
                <h2 className="text-xl font-semibold">{role} Dashboard</h2>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                    {darkMode ? <BsMoon size={20} /> : <BsSun size={20} />}
                </button>
            </div>

            <nav className="flex-grow mt-4 px-4">
                <ul className="space-y-4">
                    {menuItems.map(({ label, path, icon: Icon }, index) => (
                        <li key={index}>
                            <Link
                                to={path}
                                className="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-[#0495FF] dark:hover:bg-blue-500"
                            >
                                <Icon className="mr-3 text-xl" /> {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="px-4 py-6 text-center border-t border-gray-600">
                <button
                    onClick={handleLogout}
                    className="w-full py-2 text-sm font-medium bg-red-500 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashboardMenu;
