import { Link } from "react-router-dom"; // Uppercase L! Not 'link'
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>🌿 FlowerPlant</h1>
      <nav className={styles.nav}>
        {/* Using Link for SPA navigation - no page reload */}
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/myplants" className={styles.link}>My Plants</Link>
        <Link to="/about" className={styles.link}>About</Link>
      </nav>
    </header>
  );
}

export default Header;