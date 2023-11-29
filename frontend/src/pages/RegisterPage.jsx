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
import { useRegisterMutation } from "../redux/slices/usersApiSlice.js";
import { setCredentials } from "../redux/slices/authSlice.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

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

        if (password !== confirmPassword) {
            toast.error("Password does not match");
            return;
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Register</h1>

            <Form onSubmit={submitHandler}>
                <FormGroup controlId="name" className="my-3">
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>

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

                <FormGroup controlId="confirmPassword" className="my-3">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button
                    type="submit"
                    variant="dark"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Register
                </Button>
                {isLoading && <Loader />}
            </Form>

            <Row className="py-">
                <Col>
                    Already have an account?{" "}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : "/login"}
                    >
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterPage;
