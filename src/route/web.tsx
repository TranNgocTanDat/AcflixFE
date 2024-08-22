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
import Register from "../pages/Register/Register.tsx";
import ListFilm from "../pages/ListFilm/ListFilm.tsx";

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
      path: "/category/:categoryId",
      element: <ListFilm />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
