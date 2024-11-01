 import React from "react";
 import { Outlet } from "react-router-dom";

 import { Navbar, Nav, Container } from 'react-bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css'
 import '../../public/styles/style.css';

 
 
 function Layout(){

    return (
        <div>
             <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        <Outlet />
        </div>
    );
 };
 export default Layout;