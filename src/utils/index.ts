import {
  Booking,
  DateAndTimeParamsType,
  DateAndTimeParsedType,
  DateParamType,
  DateVerificationType,
} from "../@types/booking";

export const keystore = {
  LOGGED_IN: "LOGGED_IN",
};

export const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const dateFixing: DateParamType<string> = (date: string) => {
  const dateSplitted = date.split("-");
  return `${dateSplitted[1]}-${dateSplitted[2]}-${dateSplitted[0]}`;
};

export const dateAndTimeParsed: DateAndTimeParsedType = (
  date: string,
  time: string
): number => {
  return new Date(`${dateFixing(date)} ${time}`).getTime();
};

export const dateVerification: DateVerificationType = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  booking: Booking
) => {
  return (
    (dateAndTimeParsed(startDate, startTime) >= booking.startDateNumber &&
      dateAndTimeParsed(startDate, startTime) <= booking.endDateNumber &&
      dateAndTimeParsed(endDate, endTime) >= booking.endDateNumber) ||
    (dateAndTimeParsed(startDate, startTime) <= booking.startDateNumber &&
      dateAndTimeParsed(endDate, endTime) >= booking.startDateNumber &&
      dateAndTimeParsed(endDate, endTime) <= booking.endDateNumber) ||
    (dateAndTimeParsed(startDate, startTime) >= booking.startDateNumber &&
      dateAndTimeParsed(startDate, startTime) <= booking.endDateNumber &&
      dateAndTimeParsed(endDate, endTime) >= booking.startDateNumber &&
      dateAndTimeParsed(endDate, endTime) <= booking.endDateNumber) ||
    (dateAndTimeParsed(startDate, startTime) <= booking.startDateNumber &&
      dateAndTimeParsed(endDate, endTime) >= booking.endDateNumber)
  );
};

export const timeFormatter: DateAndTimeParamsType<string> = (
  date: string,
  time: string
) => {
  return new Date(`${dateFixing(date)} ${time}`).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const getMonth: DateParamType<string> = (date: string) => {
  return months[new Date(dateFixing(date)).getMonth()];
};

export const getDate: DateParamType<number> = (date: string) => {
  return new Date(dateFixing(date)).getDate();
};
