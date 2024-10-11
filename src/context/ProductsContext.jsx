import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { createProductRequest, getProductsRequest, deleteProductRequest, getProductRequest, updateProductRequest} from "../api/products.js";


const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}


export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);

    //Funcion para crear un producto
    const createProduct = async (product) => {
        //setProducts([...products, product]);
        await createProductRequest(product);
        getProducts();
    }

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            if(res.status === 200){
                setProducts(products.filter(product => product._id !== id));
            }
        } catch (error) {
            console.log(error);
        
        }
    }

    const updateProduct = async (id, product) => {
        try {
            const res = await updateProductRequest(id, product);
            if(res.status === 200){
                getProducts();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return <ProductsContext.Provider value={{products, createProduct, getProducts, deleteProduct, getProduct, updateProduct }}>
        {children}
    </ProductsContext.Provider>;
}

ProductsProvider.propTypes = {
    children: PropTypes.any,
};