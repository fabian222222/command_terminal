import { useForm } from "react-hook-form";
import { auth } from '../../Services/UserApi';

const ConnectionForm = () => {

    const {register, handleSubmit} = useForm()

    return (
        <div>
            <form onSubmit={handleSubmit(async(form) =>{
                    const getToken = await auth({mail:form.mail, password:form.password})
                    console.log(getToken);
                })}>
                <div>
                    <label htmlFor="title">title</label>
                    <input id='title' type="text" {...register("email", {
                        required : true
                    })} />
                </div>
                <div>
                    <label htmlFor="content">content</label>
                    <input id='content' type="text" {...register('password' , {
                        required : true,
                        minLength : 8
                    })}/>
                </div>
                <input type="submit" value="Create this article"/>
            </form>
        </div>
    )
}

export default ConnectionForm