import { useForm } from "react-hook-form";
import { Ingredient } from "../../../Interfaces/Ingredient";
import { changeIngredient } from "../../../Services/IngredientApi";

interface IngredientWithId extends Ingredient {
    id:number
}

const UpdateIngredient = (props:{
    ingredient:IngredientWithId
}) => {

    const {register, handleSubmit} = useForm()
    console.log(props.ingredient);
    return (
        <div>
             <form onSubmit={handleSubmit(async(form) =>{
                 const updateIngredient = {...props.ingredient, price: parseInt(form.price), quantity : parseInt(form.quantity)}
                 const updateIngredientAction = await changeIngredient(updateIngredient.id, { price: parseInt(form.price), quantity : parseInt(form.quantity), name:form.name})
                 console.log(updateIngredientAction);
            })}>
                <div>
                    <label htmlFor="name">name</label>
                    <input id='name' defaultValue={props.ingredient.name} type="text" {...register("name", {
                        required : true
                    })} />
                </div>
                <div>
                    <label htmlFor="price">price</label>
                    <input id='price' defaultValue={props.ingredient.price} type="number" {...register("price", {
                        required : true
                    })} />
                </div>
                <div>
                    <label htmlFor="quantity">quantity</label>
                    <input id='quantity' defaultValue={props.ingredient.quantity} type="number" {...register("quantity", {
                        required : true
                    })} />
                </div>
                <input type="submit" value="Create this article"/>
            </form>
        </div>
    )
}

export default UpdateIngredient