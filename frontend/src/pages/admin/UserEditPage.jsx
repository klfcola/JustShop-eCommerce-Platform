import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import FormContainer from "../../components/FormContainer.jsx";
import { toast } from "react-toastify";
import {
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} from "../../redux/slices/usersApiSlice.js";

const UserEditPage = () => {
    const { id: userId } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const {
        data: user,
        isLoading,
        refetch,
        error,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success("User updated successfully");
            refetch();
            navigate("/admin/userlist");
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-dark my-3">
                Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
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
                                placeholder="Enter user name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter user email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="isAdmin" className="my-2">
                            <Form.Check
                                type="chcekbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
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

export default UserEditPage;
