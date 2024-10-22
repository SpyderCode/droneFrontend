import axios from './axios';

export const getImagesRequest = async (missionId) => axios.get(`/missions/${missionId}/images`);

export const getImageByIdRequest = async (id) => axios.get(`/images/${id}`);

export const uploadImageRequest = async (imageData) => axios.post('/images/upload', imageData);

export const deleteImageRequest = async (id) => axios.delete(`/images/${id}`);
