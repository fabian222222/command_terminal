import { useForm } from "react-hook-form";
import { createProduct } from '../../../Services/ProductApi';
import { getIngredients } from "../../../Services/IngredientApi";
import { useEffect, useState } from "react";
import { Ingredient } from "../../../Interfaces/Ingredient";

interface IngredientWithId extends Ingredient{
    id:number
}
// ajouter les ingrédients dans l'envoie de produit pour créer
const AddProduct = () => {

    const {register, handleSubmit} = useForm()

    const [ingredients, setIngredients] = useState([])

    const ingredientsAction = async () => {
        const ingredientsApi = await getIngredients()
        setIngredients(ingredientsApi.ingredients)
    }

    useEffect(() => {
        ingredientsAction()
    }, [])
    
    return (
        <div>
             <form onSubmit={handleSubmit(async(form) =>{
                    console.log(form, "this is the form");
                    // await createProduct({name:form.name, price:form.price, custom:form.custom, ingredients:form.ingredients})
                })}>
                <div>
                    <label htmlFor="name">name</label>
                    <input id='name' type="text" {...register("name", {
                        required : true,
                        minLength : 5
                    })} />
                </div>
                <div>
                    <label htmlFor="price">price</label>
                    <input id='price' type="number" {...register('price' , {
                        required : true,
                        min : 1
                    })}/>
                </div>
                <div>
                    <label htmlFor="quantity">quantity</label>
                    <input id='quantity' type="number" {...register('quantity' , {
                        required : true,
                        min:1
                    })}/>
                </div>
                {
                    ingredients.map((ingredient:IngredientWithId, index:number) => {
                        return(
                            <div key={ingredient.id}>
                                <label htmlFor={ingredient.name}>{ingredient.name}</label>
                                <input id={ingredient.name} type="checkbox" value={index}  {...register("ingredients")} />
                            </div>
                        )
                    })
                }
                <input type="submit" value="Create this article"/>
            </form>
        </div>
    )
}

export default AddProduct