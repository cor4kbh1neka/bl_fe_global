import { Link, useRouteError } from "react-router-dom";
import Logo from "../fragment/Logo";
import Footer from "../component/Footer";

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="container">
      <Logo />
      <div className="secnotfound">
        <h1>404</h1>
        <p>{error.statusText || error.message}</p>
        <div className="daftarbutton">
          <Link to="/register" className="tombol full primary">
            <span className="textbutton">daftar</span>
          </Link>
        </div>
        <span className="haveakun">
          Sudah mempunya akun ?<Link to="/login">MASUK</Link>
        </span>
        <Footer />
      </div>
    </div>
  );
};

export default ErrorPage;
