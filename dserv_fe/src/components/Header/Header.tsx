import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = (userData: {roles: string[], username: string, profileId: string}) => {

  useEffect(() => {
    console.log(userData);
    if(userData.profileId === null) {
      window.location.reload();
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Meniu principal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">
            Acasa
            </Nav.Link>
            <Nav.Link href="/services">Servicii</Nav.Link>
            <Nav.Link href="/announcements">Anunturi</Nav.Link>
            <NavDropdown title={userData.username} id="navbarScrollingDropdown">
              { userData.roles.includes("ROLE_CLIENT") ?
              <NavDropdown.Item href="#action3">
                Anunturile mele
              </NavDropdown.Item> : null }
              { userData.roles.includes("ROLE_PROVIDER") ?
              <NavDropdown.Item href={"/services/" + userData.profileId}>
                Serviciile mele
              </NavDropdown.Item> : null }
              <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
