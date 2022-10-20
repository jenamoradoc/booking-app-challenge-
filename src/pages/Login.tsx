import { useEffect, FC } from "react";

import { LoginForm } from "../components";

import "../styles/pages/Login.scss";

const LoginPage: FC = () => {
  useEffect(() => {
    document.title = "Log In - Booking App";
  }, []);

  return (
    <div className="login__page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
