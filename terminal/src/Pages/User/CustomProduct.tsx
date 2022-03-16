import { IngredientContext } from "../../Providers/Ingredients/IngredientProvider"
import { CartContext } from "../../Providers/Cart/CartProvider"
import { useContext, useState, useEffect } from "react"
import { Ingredient } from "../../Interfaces/Ingredient"

interface IngredientWithId extends Ingredient{
    id:number
}

const CustomProduct = () => {

    const {ingredients} = useContext(IngredientContext)
    const {setCart, cart} = useContext(CartContext)
    const [ingredientsList, setIngredientsList] = useState([])
    const [customProduct, setCustomProduct] = useState([])

    useEffect(() => {
        setIngredientsList(ingredients)
    }, [ingredients])

    const addToCustom = (ingredient:IngredientWithId) => {
        setCustomProduct([...customProduct, ingredient])
        const removeIngredient = ingredientsList.filter((ingredientList:IngredientWithId) => {
            if (ingredient.id !== ingredientList.id) {
                return ingredientList
            }
        })
        setIngredientsList(removeIngredient)
    }

    const addProduct = () => {
        const productPriceArray = customProduct.map((ingredient:IngredientWithId) => {
            return ingredient.price
        })
        const productPrice = productPriceArray.reduce((previousPrice:number, price:number) => {
            return previousPrice + price
        })
        const ingredients = customProduct.map((ingredient:IngredientWithId) => {
            return {ingredient:{ingredient}}
        })

        const productName = "custom"
        const productCustom = true
        const product = {product:{name:productName, price:productPrice, custom:productCustom, productHasIngredient : ingredients}}

        setCart([...cart, product])

    }

    if (ingredientsList.length > 0) {
        return (
            <div>
                {
                    ingredientsList.map((ingredient:IngredientWithId) => {
                        return(
                            <div key={ingredient.id}>
                                <p>{ingredient.name}</p>
                                <p>{ingredient.price}</p>
                                <button onClick={() => {
                                    addToCustom(ingredient)
                                }}>Add this ingredient</button>
                            </div>
                        )
                    })
                }
                <button onClick={()=>{addProduct()}}>Add this product to basket</button>
            </div>
        )
    } else {
        return (
            <div>
                wait
            </div>
        )
    }

}

export default CustomProduct