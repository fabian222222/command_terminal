import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import { IngredientContext } from "../../../Providers/Ingredients/IngredientProvider";
import { Ingredient } from "../../../Interfaces/Ingredient";
import { createProduct } from "../../../Services/ProductApi";

interface IngredientWithId extends Ingredient{
    id:number
}

const AddProduct = () => {

    const {register, handleSubmit} = useForm()

    const {ingredients} = useContext(IngredientContext)

    return (
        <div>
             <form onSubmit={handleSubmit(async(form) =>{
                    console.log(form, "this is the form");

                    const ingredientsId = form.ingredients
                    const ingredientsToAdd = ingredientsId.map((ingredientId:string) => {
                        const ingredientIdInt = parseInt(ingredientId)
                        const ingredient = ingredients.filter((ingredient:any) => {
                            if (ingredient.id === ingredientIdInt){
                                return ingredient
                            }
                        })
                        return {...ingredient}
                    })

                    form.ingredients = ingredientsToAdd

                    const createIngredientAction = await createProduct({name:form.name, price:form.price, custom:false, productHasIngredient:form.ingredients})
                    console.log(createIngredientAction);
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
                                <input id={ingredient.name} type="checkbox" value={ingredient.id}  {...register("ingredients")} />
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