import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { getDroneStatusRequest, updateDroneStatusRequest, createDroneStatusRequest, deleteDroneStatusRequest, getDroneStatusByIdRequest } from "../api/DroneStatus.js";

const DroneStatusContext = createContext();

export const useDroneStatus = () => {
    const context = useContext(DroneStatusContext);
    if (!context) {
        throw new Error("useDroneStatus must be used within a DroneStatusProvider");
    }
    return context;
};




export const DroneStatusProvider = ({ children }) => {
    const [status, setStatus] = useState([]);
    const [errors, setErrors] = useState([]);

    const getDroneStatus = async () => {
        try {
            console.log("getDroneStatus");
            const res = await getDroneStatusRequest();
            console.log(res.data);
            setStatus(res.data);
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch drone status');
        }
    };

    //get drone status by id
    const getDrone = async (droneId) => {
        try {
            const res = await getDroneStatusByIdRequest(droneId);
            return res.data;
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch drone status');
        }
    }

    const updateDroneStatus = async (droneId, statusData) => {
        try {
            await updateDroneStatusRequest(droneId, statusData);
            getDroneStatus(); // Refresh drone status after update
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to update drone status');
        }
    };

    const createDroneStatus = async (droneStatus) => {
        try {
            await createDroneStatusRequest(droneStatus);
            getDroneStatus(); // Refresh drone status after create
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to create drone status');
        }
    };

    const deleteDroneStatus = async (statusId) => {
        try {
            await deleteDroneStatusRequest(statusId);
            getDroneStatus(); // Refresh drone status after delete
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to delete drone status');
        }
    };


    return (
        <DroneStatusContext.Provider value={{ status, getDroneStatus, updateDroneStatus,createDroneStatus,deleteDroneStatus,getDrone, errors }}>
            {children}
        </DroneStatusContext.Provider>
    );
};

DroneStatusProvider.propTypes = {
    children: PropTypes.any,
};
