import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
// import { route } from "../../../../../Backend/routes/authRoutes";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handelClick = (route) => {
        if (route === "/logout") {
            handelLogout();
            return;
        }
        navigate(route);
    };
    const handelLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };
    return (
        <div className="w-64 h-[calc(100vh-61)] bg-white border-r  border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col itemes-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl}
                        alt="profile Image"
                        className="w-20 h-20 bg-slate-400 rounded-full "
                    />
                ) : <></>}
                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu-${index}`}
                    className=""
                    onClick={() => handelClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};
export default SideMenu;