import React, { useState, useEffect } from 'react';
import api from "../utils/api";
import token from "../utils/token";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({Component}) => {
    const [ready, setReady] = useState(false);
    const [verified, setVerified] = useState(null);

    useEffect(async() => {
        await api.verify(token.getToken()).then(res => {
            if (res.data.success) {
                setVerified(true);
            } else {
                setVerified(false);
            };
        });
        setReady(true);
    }, []);

    if (!ready) {
        return (
        <div className="row d-flex justify-content-center pt-5">
        <Spinner animation="border"/>
        </div>
        )
    }

    return verified ? (
        <Component />
    ) : (
        <Redirect to="/" />
    );
};

export default ProtectedRoute;
