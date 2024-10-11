import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth.js";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;

};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);

            setErrors(error.response.data.message);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);

            setErrors(error.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
            Cookies.remove('token');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get('token');

            if (!cookies) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return;
            }
            try { //if token exists in cookies, verify token
                const res = await verifyTokenRequest(cookies);
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    setUser(null);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []
    );

    return (
        <AuthContext.Provider value={{ user, signup, signin, logout, loading, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>)
};

AuthProvider.propTypes = {
    children: PropTypes.any,
};