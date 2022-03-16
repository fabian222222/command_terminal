import {createContext, useState, useEffect} from "react"
import { Ingredient } from "../../Interfaces/Ingredient"
import { Product } from "../../Interfaces/Product"
import { getIngredients } from "../../Services/IngredientApi"
import { getProducts } from "../../Services/ProductApi"

export const IngredientContext = createContext()

const IngredientProvider = (props:any) => {

    const [ingredients, setIngredients] = useState([])

    const ingredientsAction = async () => {
        const ingredientsApi = await getIngredients()
        setIngredients(ingredientsApi.ingredients)
    }
    
    useEffect(() => {
        ingredientsAction()
    }, [])

    return (
        <IngredientContext.Provider value={{ingredients}}>
            {props.children}
        </IngredientContext.Provider>
    )
}

export default IngredientProvider