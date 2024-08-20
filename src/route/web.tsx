import {
  Route,
  RouteObject,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
// import App from "../App";
import MasterLayout from "../Layout/MasterLayout";
import React from "react";
import HomePage from "../pages/HomePage/HomePage.tsx";
import Result from "../component/search/Result.tsx";
import Login from "../pages/Login/Login.tsx";

const AppRouter: React.FC = () => {
  const userRouters: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
     path: "/result",
      element: <Result />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MasterLayout>
          <Routes>
            {userRouters.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </MasterLayout>
      ),
      children: userRouters,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
