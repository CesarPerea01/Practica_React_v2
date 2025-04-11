import { useState } from "react";
import { searchProducts } from "../services/products";

export function useProducts(){
    const [products, setProducts] = useState([])
    
    const getProducts = async() =>{

        const initialProducts = await searchProducts()
        console.log(initialProducts)
        setProducts(initialProducts)
    }

    return {products, getProducts}
}