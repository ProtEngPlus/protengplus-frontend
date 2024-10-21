import { Breadcrumbs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

type PathInfo = {
  name: string;
  path: string;
} | null;

const nameMapping: { [key: string]: string } = {
  dashboard: "Dashboard",
  "create-job": "Create Job",
  "account-management": "Account Management",
  "job-detail": "Job Detail",
  "change-password": "Change Password",
};

export default function Breadcrumb() {
  const pathNameArray = useLocation().pathname.split("/").filter(Boolean); // Remove empty strings

  const pathArray = pathNameArray.reduce((acc, path, index) => {
    const newPath =
      acc.length > 0 ? acc[acc.length - 1]?.path + "/" + path : "/" + path;
    acc.push({ name: nameMapping[path] || path, path: newPath });
    return acc;
  }, [] as PathInfo[]);

  const mappedPathArray = pathArray
    .map((pathInfo) => {
      if (pathInfo && nameMapping[pathInfo.name]) {
        return { name: nameMapping[pathInfo.name], path: pathInfo.path };
      }
      return pathInfo;
    })
    .filter((pathInfo): pathInfo is PathInfo => pathInfo !== null);

  return (
    <nav className="w-full  text-black whitespace-nowrap">
      <ol className="list-reset flex space-x-2 text-2xl">
        {mappedPathArray.map((pathInfo, index) => {
          if (!pathInfo) return null;

          return (
            <li
              key={pathInfo.path}
              className="flex items-center text-black space-x-2"
            >
              <span>
                <Icon icon="weui:arrow-outlined" className="w-3.5 h-7" />
              </span>
              {index === mappedPathArray.length - 1 ? (
                <li>{pathInfo.name}</li>
              ) : (
                <Link
                  to={index === mappedPathArray.length - 1 ? "" : pathInfo.path}
                >
                  {pathInfo.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
