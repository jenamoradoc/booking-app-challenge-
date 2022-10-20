import { FC } from "react";
import { FcPlus } from "react-icons/fc";
import { GrUpdate } from "react-icons/gr";

import { useForm } from "../hooks";
import Spinner from "./Spinner";

import "../styles/components/BookingForm.scss";

interface Props {
  pathname: string;
}

const BookingForm: FC<Props> = ({ pathname }) => {
  const {
    startDate,
    endDate,
    description,
    endTime,
    error,
    handleCreateOrUpdateBooking,
    handleInputChange,
    message,
    startTime,
    title,
  } = useForm(pathname);

  return (
    <form className="booking__form">
      {(error || message) && (
        <span
          className={`booking__form_alert ${message ? "success" : "error"}`}
        >
          {error ? error : message}
        </span>
      )}

      <h3>{pathname === "/booking/create" ? "Create" : "Update"} a booking</h3>

      <div className="booking__form_group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleInputChange}
        />
      </div>

      <div className="booking__form_group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={3}
          value={description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="booking__form_date">
        <div className="booking__form_group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            pattern="\d{4}-\d{2}-\d{2}"
            value={startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="booking__form_group">
          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={startTime}
            onChange={handleInputChange}
          />
        </div>

        <div className="booking__form_group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            pattern="\d{4}-\d{2}-\d{2}"
            value={endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="booking__form_group">
          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            value={endTime}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button
        className="booking__form_button"
        onClick={handleCreateOrUpdateBooking}
        disabled={error !== null || message !== null ? true : false}
      >
        {pathname === "/booking/create" ? (
          <FcPlus fontSize={"1.5rem"} />
        ) : (
          <GrUpdate fontSize={"1.2rem"} color="white" />
        )}
        {pathname === "/booking/create" ? "Create" : "Update"}
      </button>

      {(error !== null || message !== null) && (
        <div className="booking__form_spinner">
          <Spinner />
        </div>
      )}
    </form>
  );
};

export default BookingForm;
