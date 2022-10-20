import { useContext, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillCalendarFill, BsFillClockFill } from "react-icons/bs";

import { BookingContextType } from "../@types/booking";
import { BookingContext } from "../context";
import { dateFixing, timeFormatter, getMonth, getDate } from "../utils";

import "../styles/components/BookingList.scss";

const BookingList: FC = () => {
  const { bookings, deleteBooking } = useContext(
    BookingContext
  ) as BookingContextType;

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleRedirect = (id: number) => {
    navigate(`/booking/update/${id}`);
  };

  return (
    <div className="container">
      <h2>
        {bookings.length === 0
          ? "Add a new booking, please"
          : bookings.length === 1
          ? "Booking"
          : "Bookings"}
      </h2>

      <ul className="booking__list">
        {bookings.map(
          ({
            id,
            title,
            description,
            startDate,
            endDate,
            startTime,
            endTime,
          }) => (
            <li className="booking__list_item" key={id}>
              <div className="booking__list_item_image">
                <BsFillCalendarFill color="#fff" fontSize={"5rem"} />

                <div
                  className={`booking__list_item_calendar ${
                    new Date(dateFixing(startDate)) !==
                    new Date(dateFixing(endDate))
                      ? "grid"
                      : ""
                  }`}
                >
                  <p>{getDate(startDate)}</p>
                  <span>-</span>
                  <span>{getMonth(startDate)}</span>

                  {new Date(dateFixing(startDate)).toLocaleDateString() !==
                    new Date(dateFixing(endDate)).toLocaleDateString() && (
                    <>
                      <p>{getDate(endDate)}</p>
                      <span>-</span>
                      <span>{getMonth(endDate)}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="booking__list_content">
                <h4 className="booking__list_content_title">{title}</h4>
                <p className="booking__list_content_description">
                  {description}
                </p>

                <div className="booking__list_content_times">
                  <BsFillClockFill />
                  <div>
                    <p>From: {timeFormatter(startDate, startTime)}</p>
                    <p>To: {timeFormatter(endDate, endTime)}</p>
                  </div>
                </div>

                <div className="booking__list_content_buttons">
                  <button onClick={() => handleRedirect(id)}>
                    <FaEdit />
                  </button>

                  <button onClick={() => deleteBooking(id)}>
                    <AiTwotoneDelete fontSize={"1rem"} />
                  </button>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default BookingList;
