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

import FilmDetailsPage from "../pages/FilmDetailsPage/FilmDetailsPage.tsx"; // Import trang chi tiết phim
import WatchPage from "../pages/WatchPage/WatchPage.tsx"; // Import trang xem phim
import ListFilm from "../pages/ListFilm/ListFilm.tsx";
import AuthorizationFilter from "../features/auth/AuthorizationFiler.tsx";

const AppRouter: React.FC = () => {
  const userRouters: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/search",
      element: <Result />,
    },
    {
      path: "/film/:id",
      element: <FilmDetailsPage />,
    },
    {
      path: "/watch/:id",
      element: <WatchPage />,
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
