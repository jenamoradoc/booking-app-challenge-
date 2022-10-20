import { useContext, FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BookingContext } from "../context";
import { BookingContextType } from "../@types/booking";

import bookingImage from "../assets/booking.png";

import "../styles/components/Navbar.scss";

interface Props {
  home: "/admin" | "/booking";
}

const Navbar: FC<Props> = ({ home }) => {
  const { logOut, resetInputs } = useContext(
    BookingContext
  ) as BookingContextType;

  const navigate = useNavigate();

  const handleLogout = (): void => {
    logOut();
    resetInputs();

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div>
        <Link onClick={resetInputs} to={home} className="navbar__logo">
          <img src={bookingImage} alt="Booking" width={30} draggable="false" />
          <h4>Booking App</h4>
        </Link>

        <button className="navbar__button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
