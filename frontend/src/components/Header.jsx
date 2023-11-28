import React from "react";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInformation } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        console.log("Logout");
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img
                                src={logo}
                                alt="logo"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    margin: "10px",
                                }}
                            />
                            JustShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            bg="success"
                                            style={{ marginLeft: "5px" }}
                                        >
                                            {cartItems.reduce(
                                                (acc, item) =>
                                                    acc + item.quantity,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {userInformation ? (
                                <NavDropdown
                                    title={userInformation.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link href="/login">
                                        <FaUser /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
