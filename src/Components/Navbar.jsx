import React, { useState } from "react";
import { Calendar,User } from "lucide-react";
import { Link } from "react-router-dom";


export default function Navbar() {




    const [isClicked,setIsClicked] = useState(false)


  const navList = [
    { id: "dashboard", label: "Dashboard", route: "/" },
    { id: "book", label: "Book Appointment", route: "/book" },
    { id: "appointments", label: "My Appointments", route: "/appointment" },
    { id: "doctors", label: "Find Doctors", route: "/doctors" },
    { id: "patients", label: "Patient Management", route: "/patients" },
  ];

const [activeNav, setActiveNav] = useState("dashboard");

return (
    <nav className="w-full max-w-screen-xl mx-auto flex flex-row justify-evenly items-center shadow-sm px-6 md:px-10 h-[6rem]">
        <div className="flex flex-row gap-4 min-w-[260px] mr-4">
            <div
                className="h-10 w-10 bg-blue-600 flex justify-center items-center rounded-sm"
                id="navbar-left"
            >
                <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
                <b className="text-blue-500">D Code Technology</b>
                <br />
                <span>Hospital management</span>
            </div>
        </div>
        <div className="flex-1 flex justify-center" id="navbar-center">
            <ul className="list-none flex flex-row gap-6">
                {navList.map((item) => (
                    <li
                        key={item.id}
                        className={`whitespace-nowrap cursor-pointer text-sm font-medium transition-colors duration-200 ${
                            activeNav === item.id ? "text-blue-500 font-bold rounded-sm" : ""
                        }`}
                        onClick={() => setActiveNav(item.id)}
                    >
                        <Link to={item.route}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className="min-w-[120px] flex justify-end items-center gap-2" id="navbar-top-right">
            <User className="h-6 w-6 text-blue-600" />
            <span className="text-gray-700">Profile</span>
        </div>
    </nav>
);
}
