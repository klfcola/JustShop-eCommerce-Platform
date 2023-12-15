import React from "react";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/slices/usersApiSlice.js";
import { logout } from "../redux/slices/authSlice.js";
import SearchBox from "./SearchBox.jsx";
import { resetCart } from "../redux/slices/cartSlice.js";

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInformation } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutAction] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutAction().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="logo" id="logo-image" />
                            JustShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <SearchBox />
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {cartItems.length > 0 && (
                                        <Badge pill bg="light" id="badge">
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
                                <NavDropdown title={userInformation.name}>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item className="dropdown-item">
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        className="dropdown-item"
                                        onClick={logoutHandler}
                                    >
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
                            {userInformation && userInformation.isAdmin && (
                                <NavDropdown title="Admin">
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item className="dropdown-item">
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item className="dropdown-item">
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item className="dropdown-item">
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
