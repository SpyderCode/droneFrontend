import axios from './axios';

export const getDroneStatusRequest = async () => axios.get(`/droneStatus`);

//get drone status by id
export const getDroneStatusByIdRequest = async (statusId) => axios.get(`/droneStatus/${statusId}`);

export const updateDroneStatusRequest = async (droneId, statusData) => axios.put(`/droneStatus/${droneId}`, statusData);

//get all drones
//router.post('/droneStatus', authRequired, droneStatusControllers.createDroneStatus);
export const getAllDronesRequest = async () => axios.get(`/droneStatus`);

//create droneStatus
export const createDroneStatusRequest = async (droneStatus) => axios.post('/droneStatus', droneStatus);

//delete droneStatus by id
export const deleteDroneStatusRequest = async (statusId) => axios.delete(`/droneStatus/${statusId}`);