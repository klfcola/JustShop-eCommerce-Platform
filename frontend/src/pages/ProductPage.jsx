import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Form,
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating.jsx";
import { useState } from "react";
// import axios from "axios";
import { useGetProductDetailsQuery } from "../redux/slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";

const ProductScreen = () => {
    // const [product, setProduct] = useState({});

    const { id: productId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);
    //         setProduct(data);
    //     };

    //     fetchProduct();
    // }, [productId]);

    const [quantity, setQuantity] = useState(1);

    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity }));
        navigate("/cart");
    };

    return (
        <>
            <Link className="btn btn-dark my-3" to="/">
                Back
            </Link>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    <h2>Something Went Wrong...</h2>
                </Message>
            ) : (
                <>
                    <Row>
                        <Col md={5}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>{product.name}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Rating
                                        value={product.rating}
                                        text={` ${product.numReviews} reivews`}
                                    />
                                </ListGroupItem>
                                <ListGroupItem>
                                    {product.description}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>
                                                    {product.countInStock > 0
                                                        ? "In Stock"
                                                        : "Out Of Stock"}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={quantity}
                                                        onChange={(e) =>
                                                            setQuantity(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
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
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <Button
                                            className="btn-block btn-dark"
                                            type="button"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
