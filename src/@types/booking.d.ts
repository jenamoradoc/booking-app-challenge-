export interface Booking {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  startDateNumber: number;
  endDateNumber: number;
}

export type BookingContextType = {
  bookings: Booking[];
  bookingState: Omit<Booking, "id">;
  error: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  message: string | null;

  createBooking: (booking: Omit<Booking, "id">) => void;
  deleteBooking: (id: number) => void;
  dispatchError: (errorMessage: string) => void;
  dispatchMessage: (message: string) => void;
  loadingHandler: () => void;
  logIn: () => void;
  logOut: () => void;
  resetInputs: () => void;
  setBookingState: React.Dispatch<React.SetStateAction<Omit<Booking, "id">>>;
  updateBooking: (bookingItem: Booking) => void;
};

export type DateAndTimeParamsType<T> = (date: string, time: string) => T;
export type DateAndTimeParsedType = (date: string, time: string) => number;
export type DateParamType<T> = (date: string) => T;

export type DateVerificationType = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  booking: Booking
) => boolean;
