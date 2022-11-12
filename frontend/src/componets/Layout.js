import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

//after loggging in the user
import { useAuth, logout } from "../auth_provider";

const LoggedInLinks = () => {
  return (
    <>
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className=" justify-content-end"
      >
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/blogs">Blogs</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
          <Nav.Link href="/create_article">Create Post</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav>
          <p
            style={{
              color: "#ffffff",
              marginLeft: "40px",
              paddingTop: "15px",
              paddingRight: "10px",
            }}
          >
            Username
          </p>
          <Nav.Link
            href="#"
            onClick={() => {
              logout();
            }}
          >
            <Button variant="secondary">Logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};

const LoggedOutLinks = () => {
  return (
    <>
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className=" justify-content-end"
      >
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/blogs">Blogs</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link href="/login">
            <Button variant="outline-light">Login</Button>
          </Nav.Link>
          <Nav.Link eventKey={2} href="/register">
            <Button variant="outline-light">Register</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </>
  );
};
function Layout() {
  const [logged] = useAuth();

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Flask-React Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {logged ? <LoggedInLinks /> : <LoggedOutLinks />}
        </Container>
      </Navbar>

      <div className="container my-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
