import { FC, useContext } from "react";
import { TiHome } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import "../styles/components/Sidebar.scss";
import { BookingContext } from "../context/bookingContext";
import { BookingContextType } from "../@types/booking";

const Sidebar: FC = () => {
  const { resetInputs } = useContext(BookingContext) as BookingContextType;
  const navigate = useNavigate();

  const homeRedirect = (): void => {
    navigate("/booking");
    resetInputs();
  };

  return (
    <aside className="sidebar">
      <section className="sidebar__links">
        <div onClick={homeRedirect}>
          <TiHome color="white" fontSize={"1.5rem"} />
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
