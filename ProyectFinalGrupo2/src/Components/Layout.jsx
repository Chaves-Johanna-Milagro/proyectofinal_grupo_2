 import React from "react";
 import { Outlet } from "react-router-dom";

 import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
 //import 'bootstrap/dist/css/bootstrap.min.css'
 import '../../public/styles/layout.css';
 
 function Layout(){

    return (
        <div className="layout">
             <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/aboutUs">AboutUs</Nav.Link>
                                <NavDropdown
                                 id="nav-dropdown-dark-example"
                                 title="Proyectos"
                                 menuVariant="dark"
                                >
                               <NavDropdown.Item href="/calculadoraIMC">Calculadora IMC</NavDropdown.Item>                               
                               <NavDropdown.Item href="/gestorBilleteraVirtual"> Gestor de Billeteras Virtuales </NavDropdown.Item>
                               <NavDropdown.Divider />                               
                               <NavDropdown.Item href="/juegoPhaser"> Esquivar Meteoros </NavDropdown.Item>
                               <NavDropdown.Item href="/juegoReact"> Desafio Matematico </NavDropdown.Item>
                               </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className="content">
                <Outlet />             
            </main>
            <footer className="footer">
                <p>Fundamentos de Programación Web - TUDIVJ - UNJu</p>
            </footer>

        </div>
    );
 };
 export default Layout;
 