import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
    ListGroupItem,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message.jsx";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice.js";

const CartPage = () => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart;

    const navigete = useNavigate();

    const addToCartHandler = async (product, quantity) => {
        dispatch(addToCart({ ...product, quantity }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigete("/shipping?redirect=/shipping");
    };

    return (
        <Row>
            <Col md={8}>
                <h1 id="cart-page-title">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>Cart is empty !!</Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroupItem key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={4} className="cart-item-title">
                                        <Link
                                            to={`/product/${item._id}`}
                                            className="cart-item-link"
                                        >
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2} className="cart-item-price">
                                        ${item.price}
                                    </Col>
                                    <Col md={2} className="cart-item-quantity">
                                        <Form.Control
                                            as="select"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                addToCartHandler(
                                                    item,
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col
                                        md={2}
                                        className="cart-item-delete-button"
                                    >
                                        <Button
                                            className="btn-md"
                                            type="button"
                                            variant="dark"
                                            onClick={() =>
                                                removeFromCartHandler(item._id)
                                            }
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>
                                Subtotal&nbsp;
                                <strong>
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.quantity,
                                        0
                                    )}
                                </strong>
                                &nbsp;items
                            </h2>
                            $
                            {cartItems
                                .reduce(
                                    (acc, item) =>
                                        acc + item.quantity * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                variant="dark"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartPage;
