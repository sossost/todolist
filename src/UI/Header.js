import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/" className={classes.logo}>
          My to Do List
        </Link>
      </nav>
    </header>
  );
};

export default Header;
