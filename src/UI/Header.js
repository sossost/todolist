import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <a className={classes.logo} href="/">
          My to Do List
        </a>
      </nav>
    </header>
  );
};

export default Header;
