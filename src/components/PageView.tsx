import { FC, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { BookingList, Navbar, Sidebar, BookingForm } from "./";
import { BookingContext } from "../context/bookingContext";
import { BookingContextType } from "../@types/booking";

import "../styles/components/PageView.scss";

interface Props {
  viewType: "admin" | "user";
}

const PageView: FC<Props> = ({ viewType }) => {
  const { error, isLoggedIn } = useContext(
    BookingContext
  ) as BookingContextType;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  const createBookingRedirect = () => {
    navigate("create");
  };

  return (
    <div className="page__view">
      <Navbar home={viewType === "admin" ? "/admin" : "/booking"} />

      <main className="page__view_content">
        <Sidebar />

        {pathname === "/booking/create" ||
        pathname.match(/booking\/update/i) ? (
          <BookingForm pathname={pathname} />
        ) : (
          <BookingList />
        )}

        {viewType === "user" &&
          (pathname === "/booking" || pathname === "/booking/") && (
            <button
              className="page__view_add_booking"
              onClick={createBookingRedirect}
            >
              +
            </button>
          )}
      </main>
    </div>
  );
};

export default PageView;
