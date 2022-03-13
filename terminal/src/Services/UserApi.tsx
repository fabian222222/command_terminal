import { User } from "../Interfaces/User";

const baseUrl = "http://localhost:3000/"

interface Auth {
    mail:string,
    password:string
}

export const createUser = async (user:User) => {

    try {
     
        const response = await fetch(`${baseUrl}/users`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(user)
        })
    
        const json = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getUsers = async () => {

    try {
     
        const response = await fetch(`${baseUrl}/users`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:User[] = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getUser = async (userId:number) => {

    try {
     
        const response = await fetch(`${baseUrl}/users/${userId}`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:User = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const auth = async (auth:Auth) => {

    try {

        const response = await fetch(`${baseUrl}/auth`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(auth)
        })

        const json:User = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const changeUser = async (userId:number, changes:User) => {

    try {

        const response = await fetch(`${baseUrl}/users/${userId}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(changes)
        })

        const json:User = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const deleteUser = async (userId:number) => {

    try {

        const response = await fetch(`${baseUrl}/users/${userId}`, {
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        const json:User = await response.json()
        return json

    }catch (error) {
        return error
    }

}