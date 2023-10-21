import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import productsDummyData from "../data/products.json";

const HomeScreen = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {productsDummyData.products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
