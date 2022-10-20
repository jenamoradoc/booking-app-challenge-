import { useEffect, FC } from "react";

import { PageView } from "../components";

const BookingPage: FC = () => {
  useEffect(() => {
    document.title = "User - Booking App";
  }, []);

  return <PageView viewType="user" />;
};

export default BookingPage;
