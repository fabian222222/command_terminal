import { useState } from 'react'
import { useEffect } from 'react'
import AddIngredient from '../../Components/Admin/Ingredient/AddIngredient'
import IngredientSingle from '../../Components/Admin/Ingredient/IngredientSingle'
import UpdateIngredient from '../../Components/Admin/Ingredient/UpdateIngredient'
import { Ingredient } from '../../Interfaces/Ingredient'
import { getIngredients } from '../../Services/IngredientApi'

interface IngredientWithId extends Ingredient {
    id : number
}

const IngredientAdmin = () => {

    const [ingredients, setIngredients] = useState([])

    const ingredientsApi = async () => {
        const ingredientsAction = await getIngredients()
        setIngredients(ingredientsAction.ingredients)
    }

    useEffect(() => {
        ingredientsApi()
    }, [])
    
    if (ingredients.length > 0){

        return(
            <div>

                {ingredients.map((ingredient:IngredientWithId) => {
                    return(
                        <IngredientSingle key={ingredient.id} id={ingredient.id} name={ingredient.name} price={ingredient.price} quantity={ingredient.quantity} />
                    )
                })}

                <AddIngredient />

            </div>
        )

    } else {
        return(
            <div>
                wait
            </div>
        )
    }
}

export default IngredientAdmin