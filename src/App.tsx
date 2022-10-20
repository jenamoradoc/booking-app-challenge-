import { FC, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BookingProvider } from "./context";

import { BookingPage, LoginPage, NotFoundPage } from "./pages";
import { BookingContext } from "./context/bookingContext";
import { BookingContextType } from "./@types/booking";

const App: FC = () => {
  const router = createBrowserRouter([
    { path: "/", element: <LoginPage />, errorElement: <NotFoundPage /> },
    // {
    //   path: "/admin",
    //   element: <AdminPage />,
    //   errorElement: <NotFoundPage />,
    // },
    {
      path: "/booking",
      element: <BookingPage />,
      errorElement: <NotFoundPage />,
      children: [
        { path: "create", element: <BookingPage /> },
        {
          path: "update/:id",
          element: <BookingPage />,
        },
      ],
    },
  ]);

  return (
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  );
};

export default App;
