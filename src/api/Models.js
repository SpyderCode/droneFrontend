import axios from './axios';

export const getModelsRequest = async () => axios.get('/models');

export const getModelByIdRequest = async (id) => axios.get(`/models/${id}`);

export const createModelRequest = async (modelData) => axios.post('/models', modelData);

export const updateModelRequest = async (id, modelData) => axios.put(`/models/${id}`, modelData);

export const deleteModelRequest = async (id) => axios.delete(`/models/${id}`);
