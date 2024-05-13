import { Link } from "react-router-dom";
import './style.css'

export default function Header() {
    return (
      <>
        <Link to="/home">
          <img className="logo" src="/bubble-app-logo.svg" alt="Bubble App" />
        </Link>
      </>
    );
  }
  