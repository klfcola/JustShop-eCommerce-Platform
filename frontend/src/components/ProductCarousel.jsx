import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";
import { useGetTopProductsQuery } from "../redux/slices/productsApiSlice.js";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel
            pause="hover"
            className="bg-secondary mb-4"
            data-bs-theme="dark"
        >
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fluid
                            style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>
                                {product.name} (${product.price})
                            </h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
