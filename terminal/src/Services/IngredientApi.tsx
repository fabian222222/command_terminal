import { Ingredient } from "../Interfaces/Ingredient";

const baseUrl = "http://localhost:3000/"

export const createIngredient = async (ingredient:Ingredient) => {

    try {
     
        const response = await fetch(`${baseUrl}/ingredients`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(ingredient)
        })
    
        const json = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getIngredients = async () => {

    try {
     
        const response = await fetch(`${baseUrl}/ingredients`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Ingredient[] = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getIngredient = async (ingredientId:number) => {

    try {
     
        const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Ingredient = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const changeIngredient = async (ingredientId:number, changes:Ingredient) => {

    try {

        const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(changes)
        })

        const json:Ingredient = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const deleteIngredient = async (ingredientId:number) => {

    try {

        const response = await fetch(`${baseUrl}/ingredients/${ingredientId}`, {
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        const json:Ingredient = await response.json()
        return json

    }catch (error) {
        return error
    }

}