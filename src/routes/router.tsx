import { Route, Routes } from "react-router-dom";
import pagesData from "./getPagesData";

const Router = () => {
  const pageRoutes = pagesData.map((pageRoute, index) => {
    return <Route key={index} {...pageRoute} />;
  });
  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
