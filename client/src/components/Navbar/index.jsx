import { useState } from "react";
import styles from "./style.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}> Al-Ra’ad </div>
            <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
                <a href="/">Home</a>
                <a href="/tafseer">About</a>
                <a href="/tafseer">Contact</a>
                <a href="/tafseer">Tafseer</a>
                <a href="/books">Books</a>
                <a href="/videos">Videos</a>
            </div>
            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                <span></span><span></span><span></span>
            </div>
        </nav>
    );
}

export default Navbar;