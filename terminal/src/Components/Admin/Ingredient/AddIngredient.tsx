import { useForm } from "react-hook-form";
import { createIngredient } from '../../../Services/IngredientApi';

const AddIngredient = () => {

    const {register, handleSubmit} = useForm()

    return (
        <div>
            <form onSubmit={handleSubmit(async(form) =>{
                    await createIngredient({name:form.name, price:form.price, quantity:form.quantity})
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
                <input type="submit" value="Create this article"/>
            </form>
        </div>
    )
}

export default AddIngredient