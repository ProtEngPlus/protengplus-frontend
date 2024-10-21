import React, { useState } from "react";
import logoWithText from "../../../assets/images/LogoWithText/logoWithText.svg";
import { Icon } from "@iconify/react";
import Breadcrumb from "./Breadcrumb";
import { Link, useNavigate } from "react-router-dom";

type MenuItem = {
  icon: string;
  name: string;
  path: string;
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Menu Item for side bar
  const menuItems: MenuItem[] = [
    {
      icon: "basil:add-outline",
      name: "Create Job",
      path: "/create-job",
    },
    {
      icon: "ic:round-dashboard",
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  const handleToggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen">
      {/* Nav bar */}
      <nav className="fixed top-0 z-50 h-[4.5rem] w-full items-center bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* Nav bar - left side*/}
        <div className="flex flex-row h-full items-center space-x-9">
          <div className="flex items-center h-full w-[299px] min-w-[299px] justify-center bg-gray-50">
            <img src={logoWithText} alt="Logo" />
            <button type="button" onClick={handleToggleSidebar}>
              <Icon
                icon="mdi:hamburger-menu"
                className="text-[#2578D3] size-11"
              />
            </button>
          </div>

          {/* Nav bar - right side*/}
          <div className="flex flex-row h-full grow items-center">
            {/* Breadcrumb */}
            <Breadcrumb />

            {/* User Icon */}
            <div className="flex flex-row items-center min-w-fit h-full bg-gray-50 rounded-b-xl px-5 space-x-4 m-auto">
              <Icon
                icon="ph:user"
                className="size-11 rounded-full p-2.5 text-white bg-[#F58634] hover:cursor-pointer"
                onClick={() => {
                  navigate("/account-management");
                }}
              />
              <div className="flex flex-col">
                <p>Name S.</p>
                <p className="text-xs">position</p>
              </div>
              <Icon
                icon="mingcute:exit-door-fill"
                className="text-[#2578D3] size-[45px] hover:cursor-pointer"
                onClick={() => {
                  navigate("/sign-in");
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Side bar*/}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-[4.5rem] transition-transform ${
          isSidebarVisible ? "w-64 translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full w-[299px] overflow-y-auto bg-gray-50 py-14 px-4">
          <ul className="space-y-9">
            {menuItems.map(({ icon, name, path }) => (
              <Link
                key={name}
                to={path}
                className="flex items-center p-2 space-x-2.5 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Icon icon={icon} className="size-6" />
                <span className="ms-3">{name}</span>
              </Link>
            ))}
          </ul>
        </div>
      </aside>

      {/* Children*/}
      <div
        className={isSidebarVisible ? "pt-[4.5rem] pl-[299px]" : "pt-[4.5rem]"}
      >
        <div className="px-9 py-12">{children}</div>
      </div>
    </div>
  );
}
