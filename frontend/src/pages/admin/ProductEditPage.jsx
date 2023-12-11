import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import FormContainer from "../../components/FormContainer.jsx";
import { toast } from "react-toastify";
import {
    useUpdateProductMutation,
    useGetProductDetailsQuery,
    useUploadProductImageMutation,
} from "../../redux/slices/productsApiSlice.js";

const ProductEditPage = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] =
        useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpload }] =
        useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        const result = await updateProduct(updatedProduct);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Product updated");
            navigate("/admin/productlist");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-dark my-3">
                Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price" className="my-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter product price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image" className="my-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Upload Product image"
                                value={image}
                                onChange={(e) => setImage}
                            ></Form.Control>
                            <Form.Control
                                type="file"
                                label="Choose file"
                                onChange={uploadFileHandler}
                            ></Form.Control>
                            {loadingUpload && <Loader />}
                        </Form.Group>

                        <Form.Group controlId="brand" className="my-2">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock" className="my-2">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter count in stock"
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category" className="my-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description" className="my-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="dark" className="my-2">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditPage;
