import { Command } from "../Interfaces/Command";
import { Product } from "../Interfaces/Product";

const baseUrl = "http://localhost:8000"

export const createCommand = async (product:Product[]) => {

    try {
     
        const response = await fetch(`${baseUrl}/commands`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify({
                products:product
            })
        })
    
        const json = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getCommands = async () => {

    try {
     
        const response = await fetch(`${baseUrl}/commands`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getCommandsStatus = async (status:"preparation"|"termine") => {

    try {
     
        const response = await fetch(`${baseUrl}/commands/${status}`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Command[] = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getCommand = async (commandId:number) => {

    try {
     
        const response = await fetch(`${baseUrl}/commands/${commandId}`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Command = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const changeCommand = async (commandId:number, changes:Command) => {

    try {

        const response = await fetch(`${baseUrl}/commands/${commandId}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(changes)
        })

        const json:Command = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const finishCommand = async (commandId:number) => {

    try {

        const response = await fetch(`${baseUrl}/commands/${commandId}/finish`, {
            method:"PUT",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        const json:Command = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const deleteCommand = async (commandId:number) => {

    try {

        const response = await fetch(`${baseUrl}/commands/${commandId}`, {
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        const json:Command = await response.json()
        return json

    }catch (error) {
        return error
    }

}