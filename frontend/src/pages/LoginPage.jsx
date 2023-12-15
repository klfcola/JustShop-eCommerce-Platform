import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    Row,
    Col,
    FormGroup,
    FormControl,
    FormLabel,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../redux/slices/usersApiSlice.js";
import { setCredentials } from "../redux/slices/authSlice.js";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInformation } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get("redirect") || "/";

    useEffect(() => {
        if (userInformation) {
            navigate(redirect);
        }
    }, [userInformation, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <FormGroup controlId="email" className="my-3">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId="password" className="my-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button
                    type="submit"
                    variant="dark"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer ?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                        id="register-link"
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginPage;
