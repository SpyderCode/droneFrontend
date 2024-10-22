import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getMissionsRequest, getMissionByIdRequest, createMissionRequest, updateMissionRequest, deleteMissionRequest } from "../api/Missions.js";

const MissionsContext = createContext();

export const useMissions = () => {
    const context = useContext(MissionsContext);
    if (!context) {
        throw new Error("useMissions must be used within a MissionsProvider");
    }
    return context;
};

export const MissionsProvider = ({ children }) => {
    const [missions, setMissions] = useState([]);
    const [errors, setErrors] = useState([]);

    const getMissions = async () => {
        try {
            

            const res = await getMissionsRequest();
            console.log(res.data);
            setMissions(res.data);
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch missions');
        }
    };

    const getMissionById = async (id) => {
        try {
            const res = await getMissionByIdRequest(id);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch mission');
        }
    };

    const createMission = async (mission) => {
        try {
            await createMissionRequest(mission);
            getMissions(); // Refresh missions after creation
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to create mission');
        }
    };

    const updateMission = async (id, mission) => {
        try {
            await updateMissionRequest(id, mission);
            getMissions(); // Refresh missions after update
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to update mission');
        }
    };

    const deleteMission = async (id) => {
        try {
            await deleteMissionRequest(id);
            getMissions(); // Refresh missions after update
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to delete mission');
        }
    };

    useEffect(() => {
        getMissions();
    }, []);

    return (
        <MissionsContext.Provider value={{ missions, getMissionById, createMission, updateMission, deleteMission, errors }}>
            {children}
        </MissionsContext.Provider>
    );
};

MissionsProvider.propTypes = {
    children: PropTypes.any,
};
