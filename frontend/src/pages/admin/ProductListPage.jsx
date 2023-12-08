import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice.js";

const ProductListPage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    const deleteHandler = (id) => {
        console.log("Delete", id);
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className="btn-sm m-3" variant="dark">
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table striped hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/product/${product._id}/edit`}
                                        >
                                            <Button
                                                variant="light"
                                                className="brn-sm mx-2"
                                            >
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="dark"
                                            className="btn-sm"
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default ProductListPage;
