import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar  from "./Navbar";
import SideMenu from "./SideMenu";


const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);
console.log("User context in DashboardLayout:", user);
    return (
        <div className="">
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div>
                    {/* <div className="max-[1080px]:hidden"> */}
                        <SideMenu activeMenu={activeMenu} />
                    {/* </div> */}
                    </div>
                    <div className="grow-max-5">{children}</div>
                </div>
            )}
        </div>
    );
};


export default DashboardLayout;