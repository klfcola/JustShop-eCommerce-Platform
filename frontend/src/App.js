import React from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <h1>React init test</h1>
                </Container>
            </main>
        </>
    );
};

export default App;
