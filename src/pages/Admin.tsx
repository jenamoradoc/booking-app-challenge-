import { useEffect, FC } from "react";

import { PageView } from "../components";

const AdminPage: FC = () => {
  useEffect(() => {
    document.title = "Admin - Booking App";
  }, []);

  return <PageView viewType="admin" />;
};

export default AdminPage;
