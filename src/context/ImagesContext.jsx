import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { getImagesRequest, getImageByIdRequest, uploadImageRequest, deleteImageRequest } from "../api/Images.js";

const ImagesContext = createContext();

export const useImages = () => {
    const context = useContext(ImagesContext);
    if (!context) {
        throw new Error("useImages must be used within an ImagesProvider");
    }
    return context;
};

export const ImagesProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    const getImages = async (missionId) => {
        try {
            const res = await getImagesRequest(missionId);
            setImages(res.data);
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch images');
        }
    };

    const getImageById = async (id) => {
        try {
            const res = await getImageByIdRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to fetch image');
        }
    };

    const uploadImage = async (imageData) => {
        try {
            await uploadImageRequest(imageData);
            getImages(imageData.missionId); // Refresh images after upload
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to upload image');
        }
    };

    const deleteImage = async (id) => {
        try {
            await deleteImageRequest(id);
            setImages(images.filter(image => image.id !== id));
        } catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || 'Failed to delete image');
        }
    };

    return (
        <ImagesContext.Provider value={{ images, getImages, getImageById, uploadImage, deleteImage, errors }}>
            {children}
        </ImagesContext.Provider>
    );
};

ImagesProvider.propTypes = {
    children: PropTypes.any,
};
