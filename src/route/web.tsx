import { Route, RouteObject, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
// import App from "../App";
import MasterLayout from "../pages/users/theme/masterLayout";
import React from "react";
import HomePage from "../pages/users/homePage/homePage";

const AppRouter: React.FC = () => {
    const userRouters: RouteObject[] = [
        {
            path: '/',
            element: <HomePage />,
        },
        
    ];

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <MasterLayout >
                    <Routes>
                        {userRouters.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </MasterLayout>
            ),
            children: userRouters,
        },
        // {
        //     path: '/',
        //     element: <App />,
        //     children: [
        //         {
        //             path: 'productDetail/:id',
        //             element: (<MasterLayout CartItem={CartItem.length}><ProductDetail addToCart={addToCart} /></MasterLayout>),
        //             // loader: loadProduct,
        //         },
        //     ]
        // }
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;