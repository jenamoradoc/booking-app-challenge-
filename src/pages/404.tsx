import { Navbar } from "../components";

import not_found from "../assets/404.svg";

import "../styles/pages/404.scss";

const NotFoundPage = () => {
  return (
    <>
      <Navbar home="/booking" />
      <div className="not__found">
        <div>
          <img src={not_found} alt="Not Found" />
          <h2>page not found</h2>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
