import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { useGetOrdersQuery } from "../../redux/slices/ordersApiSlice.js";

const OrderListPage = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            <h1>Orders</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">USER</th>
                            <th className="text-center">DATE</th>
                            <th className="text-center">TOTAL</th>
                            <th className="text-center">PAID</th>
                            <th className="text-center">DELIVERED</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="text-center">{order._id}</td>
                                <td className="text-center">
                                    {order.user && order.user.name}
                                </td>
                                <td className="text-center">
                                    {order.createdAt.substring(0, 10)}
                                </td>
                                <td className="text-center">
                                    ${order.totalPrice}
                                </td>
                                <td className="text-center">
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: "red" }} />
                                    )}
                                </td>
                                <td className="text-center">
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: "red" }} />
                                    )}
                                </td>
                                <td className="text-center">
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            variant="dark"
                                            className="btn-sm"
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListPage;
