 import React from "react";
 import { Link,Outlet } from "react-router-dom";
 
 
 function Layout(){

    return (
        <div>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <Outlet />
        </div>
    );
 };
 export default Layout;