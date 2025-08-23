import React, { useEffect } from "react";
 import {useNavigate} from "react-router-dom"

export const CheckAuth = ({children, protectedRoute}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (protectedRoute && !token) {
            navigate("/login");
        }
    }, [protectedRoute, token, navigate]);

    return (
        <>
            {children}
        </>
    );
}