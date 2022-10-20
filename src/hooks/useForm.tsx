import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BookingContext } from "../context/bookingContext";
import { Booking, BookingContextType } from "../@types/booking";
import { dateAndTimeParsed, dateVerification } from "../utils";

const useForm = (pathname: string) => {
  const {
    bookings,
    bookingState,
    setBookingState,
    dispatchError,
    createBooking,
    updateBooking,
    dispatchMessage,
    resetInputs,
    error,
    message,
  } = useContext(BookingContext) as BookingContextType;

  const navigate = useNavigate();
  const params = useParams();

  const bookingItem = bookings.filter(
    (booking) => booking.id === +params.id!
  )[0];

  useEffect(() => {
    if (pathname.match(/booking\/update/i) && bookingItem) {
      const { id, ...otherProperties } = bookingItem;

      setBookingState(otherProperties);
    }
  }, [bookingItem]);

  const { title, description, startDate, endDate, startTime, endTime } =
    bookingState;

  const handleInputChange = (event: any): void => {
    setBookingState((bookingState) => ({
      ...bookingState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (bookings && pathname.match(/booking\/update/i)) {
      const bookingExists = bookings.filter(
        (booking) => booking.id === +params.id!
      );

      if (bookingExists.length === 0) {
        navigate("/booking");
      }
    }
  }, []);

  const handleCreateOrUpdateBooking = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (title.trim() === "" || bookingItem?.title.trim() === "") {
      return dispatchError("Title is required");
    } else if (
      description.trim() === "" ||
      bookingItem?.description.trim() === ""
    ) {
      return dispatchError("Description is required");
    } else if (
      startDate.trim() === "" ||
      bookingItem?.startDate.trim() === ""
    ) {
      return dispatchError("Start date is required");
    } else if (endDate.trim() === "" || bookingItem?.endDate.trim() === "") {
      return dispatchError("End date is required");
    } else if (
      startTime.trim() === "" ||
      bookingItem?.startTime.trim() === ""
    ) {
      return dispatchError("Start time is required");
    } else if (endTime.trim() === "" || bookingItem?.endTime.trim() === "") {
      return dispatchError("End time is required");
    } else if (
      dateAndTimeParsed(startDate, startTime) >
        dateAndTimeParsed(endDate, endTime) ||
      dateAndTimeParsed(startDate, startTime) ===
        dateAndTimeParsed(endDate, endTime)
    ) {
      return dispatchError("Start date must be less than end date");
    }

    const bookingsScheduleVerification: Booking[] = +params.id!
      ? bookings
          .filter(({ id }) => id !== +params.id!)
          .filter((booking) =>
            dateVerification(startDate, endDate, startTime, endTime, booking)
          )
      : bookings.filter((booking) =>
          dateVerification(startDate, endDate, startTime, endTime, booking)
        );

    if (bookingsScheduleVerification.length > 0) {
      return dispatchError("The booking overlaps with one or more bookings!");
    }

    if (pathname.match(/booking\/create/i)) {
      createBooking(bookingState);
    } else {
      updateBooking({ id: +params.id!, ...bookingState });
    }

    dispatchMessage(
      `Booking ${
        pathname.match(/booking\/create/i) ? "created" : "updated"
      } successfully!`
    );

    setTimeout(() => {
      navigate("/booking");
      resetInputs();
    }, 3000);
  };

  return {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    handleInputChange,
    handleCreateOrUpdateBooking,
    error,
    message,
  };
};

export default useForm;
