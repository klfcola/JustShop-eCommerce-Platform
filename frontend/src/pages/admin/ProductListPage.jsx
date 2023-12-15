import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from "../../redux/slices/productsApiSlice.js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate.jsx";

const ProductListPage = () => {
    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetProductsQuery({
        pageNumber,
    });

    const [createProduct, { isLoading: loadingCreate }] =
        useCreateProductMutation();

    const [deleteProduct, { isLoading: loadingDelete }] =
        useDeleteProductMutation();

    const createProductHandler = async () => {
        if (window.confirm("Are you sure you want to create a new product?")) {
            try {
                await createProduct();
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                toast.success("Product deleted");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button
                        className="btn-sm m-3"
                        variant="dark"
                        onClick={createProductHandler}
                    >
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error.data.message}</Message>
            ) : (
                <>
                    <Table striped hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th className="text-center">ID</th>
                                <th className="text-center">NAME</th>
                                <th className="text-center">PRICE</th>
                                <th className="text-center">CATEGORY</th>
                                <th className="text-center">BRAND</th>
                                <th className="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td className="text-center">
                                        {product._id}
                                    </td>
                                    <td className="text-center">
                                        {product.name}
                                    </td>
                                    <td className="text-center">
                                        {product.price}
                                    </td>
                                    <td className="text-center">
                                        {product.category}
                                    </td>
                                    <td className="text-center">
                                        {product.brand}
                                    </td>
                                    <td className="text-center">
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
                                            className="btn-md"
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
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        isAdmin={true}
                    />
                </>
            )}
        </>
    );
};

export default ProductListPage;
