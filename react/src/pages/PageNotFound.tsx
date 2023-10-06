import { Link } from "react-router-dom";
import Image from "/images/404.svg";
import '../assets/scss/pageNotFound.scss';

export const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <img src={Image} alt="404 Image" />
      <h2>404</h2>
      <h2>Page not found</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}