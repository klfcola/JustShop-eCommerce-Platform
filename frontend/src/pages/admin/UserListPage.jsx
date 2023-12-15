import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {
    useGetUsersQuery,
    useDeleteUserMutation,
} from "../../redux/slices/usersApiSlice.js";
import { toast } from "react-toastify";

const UserListPage = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(id);
                toast.success("User deleted");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <>
            <h1>Users</h1>
            {loadingDelete && <Loader />}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">NAME</th>
                            <th className="text-center">EMAIL</th>
                            <th className="text-center">ADMIN</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="text-center">{user._id}</td>
                                <td className="text-center">{user.name}</td>
                                <td className="text-center">
                                    <a
                                        href={`mailto:${user.email}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        {user.email}
                                    </a>
                                </td>
                                <td className="text-center">
                                    {user.isAdmin ? (
                                        <FaCheck style={{ color: "green" }} />
                                    ) : (
                                        <FaTimes style={{ color: "red" }} />
                                    )}
                                </td>
                                <td className="text-center">
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-md mx-2"
                                        >
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="dark"
                                        className="btn-md"
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListPage;
