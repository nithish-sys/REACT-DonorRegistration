import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./index.css";
import Home from "./home";
import DonarRegistration from "./donarRegistration";
import Requirement from "./requirement";
import AdminLogin from "./adminLogin";
import { AuthProvider } from "./authContext";
import DashBoard from "./dashBoard";
import PrivateRoute from "./privateRoute";

const Navbarcomp = () => {
  return (
    <Router>
      <div>
        <Navbar id="navi" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container id="Container">
            <Navbar.Brand as={Link} to={"/home"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-house-heart"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207l-5-5-5 5V13.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7.207Zm-5-.225C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z"
                />
              </svg>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/donarRegistration"}>
                  Donar Registration
                </Nav.Link>
                <Nav.Link as={Link} to={"/requirement"}>
                  Requirement
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to={"/adminLogin"}>
                  Admin Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/DonarRegistration">
            <DonarRegistration />
          </Route>
          <Route path="/requirement">
            <Requirement />
          </Route>
          <AuthProvider>
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Router>
                  <AuthProvider>
                    <Switch>
                      <PrivateRoute exact path="/" component={DashBoard} />
                      <Route path="/adminLogin" component={AdminLogin} />
                    </Switch>
                  </AuthProvider>
                </Router>
              </div>
            </Container>
          </AuthProvider>
        </Switch>
      </div>
    </Router>
  );
};

export default Navbarcomp;
