import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { getModelsRequest, getModelByIdRequest, createModelRequest, updateModelRequest, deleteModelRequest } from "../api/Models.js";

const ModelsContext = createContext();

export const useModels = () => {
    const context = useContext(ModelsContext);
    if (!context) {
        throw new Error("useModels must be used within a ModelsProvider");
    }
    return context;
};

export const ModelsProvider = ({ children }) => {
    const [models, setModels] = useState([]);
    const [errors, setErrors] = useState([]);

    const getModels = async () => {
        try {
            const res = await getModelsRequest();
            setModels(res.data);
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch models');
        }
    };

    const getModelById = async (id) => {
        try {
            const res = await getModelByIdRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch model');
        }
    };

    const createModel = async (modelData) => {
        try {
            await createModelRequest(modelData);
            getModels(); // Refresh models after creation
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to create model');
        }
    };

    const updateModel = async (id, modelData) => {
        try {
            await updateModelRequest(id, modelData);
            getModels(); // Refresh models after update
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to update model');
        }
    };

    const deleteModel = async (id) => {
        try {
            await deleteModelRequest(id);
            setModels(models.filter(model => model.id !== id));
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to delete model');
        }
    };

    return (
        <ModelsContext.Provider value={{ models, getModelById, createModel, updateModel, deleteModel, errors }}>
            {children}
        </ModelsContext.Provider>
    );
};

ModelsProvider.propTypes = {
    children: PropTypes.any,
};
