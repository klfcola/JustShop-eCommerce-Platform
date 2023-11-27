import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <FormGroup controlId="email" className="my-3">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId="password" className="my-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button type="submit" variant="dark" className="mt-2">
                    Sign In
                </Button>
            </Form>

            <Row className="py-">
                <Col>
                    New Customer? <Link to="/register">Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginPage;
