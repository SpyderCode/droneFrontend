import axios from './axios';

export const getMissionsRequest = async () => axios.get('/missions');

export const getMissionByIdRequest = async (id) => axios.get(`/missions/${id}`);

export const createMissionRequest = async (mission) => axios.post('/missions', mission);

export const updateMissionRequest = async (id, mission) => axios.put(`/missions/${id}`, mission);

export const deleteMissionRequest = async (id) => axios.delete(`/missions/${id}`);
