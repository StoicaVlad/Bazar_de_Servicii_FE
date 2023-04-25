import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = (userData: {roles: string[], username: string}) => {
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
            <Nav.Link href="#action1">Acasa</Nav.Link>
            <Nav.Link href="#action2">Servicii</Nav.Link>
            <Nav.Link href="#action6">Anunturi</Nav.Link>
            <NavDropdown title={userData.username} id="navbarScrollingDropdown">
              { userData.roles.includes("ROLE_CLIENT") ?
              <NavDropdown.Item href="#action3">
                Anunturile mele
              </NavDropdown.Item> : null }
              { userData.roles.includes("ROLE_PROVIDER") ?
              <NavDropdown.Item href="#action3">
                Serviciile mele
              </NavDropdown.Item> : null }
              <NavDropdown.Item href="#action4">Profil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;