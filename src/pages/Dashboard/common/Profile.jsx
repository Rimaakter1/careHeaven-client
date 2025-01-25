import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Profile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();

    if (loading || isLoading) return <h1>Loading...</h1>;

    return (
        <div className="">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
                <div className="flex mt-14 justify-center">
                    <img
                        src={user?.photoURL}
                        alt="profile"
                        className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                    />

                </div>
                <div className="mt-5 px-6 pb-6 text-center">
                    <span className="bg-green-500 text-white text-sm font-medium rounded-full px-4 py-1">
                        {role || "Role Unavailable"}
                    </span>
                    <h1 className="mt-2 text-2xl font-semibold text-gray-800">{user.displayName || "Anonymous"}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500 mt-2">User ID: {user.uid}</p>

                    <div className="mt-6">
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600">
                            Update Profile
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
