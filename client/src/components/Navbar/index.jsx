import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
import { getUser } from "../../constants";
import { useAuth } from "../../context/auth";

function NavbarBS() 
{
    // Auth context
    const { user, userLogout } = useAuth();
    const userData = user || getUser();

    return (
        <Navbar variant="dark" expand="lg" fixed="top" className={styles.navbar}>
            <Container fluid className={styles.containerFix}>
                {/* Logo */}
                <Navbar.Brand as={NavLink} to="/" className={styles.logo}>
                    <img src="/logo.png" alt="Logo" className={styles.logoImg} />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" className={styles.hamburger} />
                <Navbar.Collapse id="main-navbar">
                    <Nav className={`ms-auto ${styles.NavLinks}`}>
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                        {userData && <Nav.Link as={NavLink} to="/tafseer">Tafseer</Nav.Link>}
                        <Nav.Link as={NavLink} to="/books">Books</Nav.Link>
                        <Nav.Link as={NavLink} to="/audios">Audios</Nav.Link>

                        {userData ? (
                            <NavDropdown title={userData?.name || "Account"} className={styles.userDropdown}>
                                <NavDropdown.Item as={NavLink} to="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={NavLink} to="/login">Signin</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarBS;