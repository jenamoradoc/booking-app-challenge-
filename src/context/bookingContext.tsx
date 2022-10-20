import { createContext, FC, useCallback, useState } from "react";
import Swal from "sweetalert2";

import { Booking, BookingContextType } from "../@types/booking";
import { dateAndTimeParsed, keystore } from "../utils";

export const BookingContext = createContext<BookingContextType | null>(null);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const BookingProvider: FC<Props> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(
    JSON.parse(localStorage.getItem("bookings")!) || []
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    JSON.parse(localStorage.getItem(keystore.LOGGED_IN)!) || false
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [bookingState, setBookingState] = useState<Omit<Booking, "id">>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    startDateNumber: 0,
    endDateNumber: 0,
  });

  const resetInputs = () => {
    setBookingState({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      startDateNumber: 0,
      endDateNumber: 0,
    });
  };

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
    localStorage.setItem(keystore.LOGGED_IN, JSON.stringify(true));
  }, []);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem(keystore.LOGGED_IN);
  }, []);

  const loadingHandler = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const dispatchError = useCallback((errorMessage: string): void => {
    setError(errorMessage);

    setTimeout(() => {
      setError(null);
    }, 3000);
  }, []);

  const dispatchMessage = useCallback((message: string): void => {
    setMessage(message);

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, []);

  const createBooking = useCallback((booking: Omit<Booking, "id">) => {
    const { title, description, startDate, endDate, startTime, endTime } =
      booking;

    const newBooking: Booking = {
      id: +Math.random().toString().split(".")[1],
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      startDateNumber: dateAndTimeParsed(startDate, startTime),
      endDateNumber: dateAndTimeParsed(endDate, endTime),
    };

    setBookings((bookings) => [...bookings, newBooking]);
  }, []);

  const updateBooking = useCallback((bookingItem: Booking) => {
    setBookings((state) => [
      ...state.filter((booking) => booking.id !== bookingItem.id),
      bookingItem,
    ]);
  }, []);

  const deleteBooking = useCallback((id: number) => {
    Swal.fire({
      title: "Delete this booking?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");

        setBookings((bookings) => [
          ...bookings.filter((booking) => booking.id !== id),
        ]);
      }
    });
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        bookingState,
        error,
        isLoggedIn,
        loading,
        message,

        createBooking,
        deleteBooking,
        dispatchError,
        dispatchMessage,
        loadingHandler,
        logIn,
        logOut,
        resetInputs,
        setBookingState,
        updateBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
