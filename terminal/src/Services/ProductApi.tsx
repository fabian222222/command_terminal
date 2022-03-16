import { Product } from "../Interfaces/Product";

const baseUrl = "http://localhost:8000"

export const createProduct = async (product:Product) => {

    try {
     
        const response = await fetch(`${baseUrl}/products`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(product)
        })
    
        const json = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getProducts = async () => {

    const response = await fetch(`${baseUrl}/products`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
    })

    const json = await response.json()
    return json

}

export const getProduct = async (productId:number) => {

    try {
     
        const response = await fetch(`${baseUrl}/products/${productId}`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Product = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const changeProduct = async (productId:number, changes:Product) => {

    try {

        const response = await fetch(`${baseUrl}/products/${productId}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(changes)
        })

        const json:Product = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const deleteProduct = async (productId:number) => {

    try {

        const response = await fetch(`${baseUrl}/products/${productId}`, {
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        const json:Product = await response.json()
        return json

    }catch (error) {
        return error
    }

}