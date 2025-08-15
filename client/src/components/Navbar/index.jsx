import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
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
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className={styles.logo}> Al-Ra’ad </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" className={styles.hamburger} />
                <Navbar.Collapse id="main-navbar">
                    <Nav className={`ms-auto ${styles.NavLinks}`}>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        {
                            userData && ( <Nav.Link as={Link} to="/tafseer">Tafseer</Nav.Link> )
                        }
                        <Nav.Link as={Link} to="/books">Books</Nav.Link>
                        <Nav.Link as={Link} to="/audios">Audios</Nav.Link>
                        {/* <Nav.Link as={Link} to="/videos">Videos</Nav.Link> */}
                        {
                            userData ? 
                            (
                                <NavDropdown title={ userData?.name || "Account" } className={styles.userDropdown}>
                                    <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                    <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            )
                            :
                            (
                                <Nav.Link as={Link} to="/login">Signin</Nav.Link>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarBS;