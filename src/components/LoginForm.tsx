import { useState, FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/components/LoginForm.scss";
import { BookingContext } from "../context/bookingContext";
import { BookingContextType } from "../@types/booking";

interface Login {
  username: string;
  password: string;
}

const LoginForm: FC = () => {
  const { error, dispatchError, logIn, isLoggedIn } = useContext(
    BookingContext
  ) as BookingContextType;

  const navigate = useNavigate();

  const [{ username, password }, setLogin] = useState<Login>({
    username: "",
    password: "",
  });

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((state) => ({ ...state, [target.name]: target.value }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/booking");
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      return dispatchError("¡Username and password are required!");
    }

    if (username.trim() !== "user" && password.trim() !== "user") {
      return dispatchError("¡Invalid username or password!");
    }

    logIn();

    setTimeout(() => {
      navigate("/booking");
    }, 2000);
  };

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      {error && <span className="login__form_error">{error}</span>}
      <h2 className="login__form_title">Log In</h2>

      <div className="login__form_group">
        <label htmlFor="username" className="login__form_group__label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="login__form_group__input"
          value={username}
          onChange={handleInputChange}
        />
      </div>

      <div className="login__form_group">
        <label htmlFor="pasword" className="login__form_group__label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="login__form_group__input"
          value={password}
          onChange={handleInputChange}
        />
      </div>

      <input
        type="submit"
        value="Log in"
        className="login__form_button"
        disabled={error ? true : false}
      />

      <span>
        <h6>Default user</h6>
        <p>username: user, password: user</p>
      </span>
    </form>
  );
};

export default LoginForm;
