import { Terminal } from "../Interfaces/Terminal";

const baseUrl = "http://localhost:3000"

export const createTerminal = async (product:Terminal) => {

    try {
     
        const response = await fetch(`${baseUrl}/terminals`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(product)
        })
    
        const json = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getTerminals = async () => {

    try {
     
        const response = await fetch(`${baseUrl}/terminals`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Terminal[] = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getTerminal = async (terminalId:number) => {

    try {
     
        const response = await fetch(`${baseUrl}/terminals/${terminalId}`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Terminal = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const changeTerminal = async (terminalId:number, changes:Terminal) => {

    try {

        const response = await fetch(`${baseUrl}/terminals/${terminalId}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(changes)
        })

        const json:Terminal = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const deleteTerminal = async (terminalId:number) => {

    try {

        const response = await fetch(`${baseUrl}/terminals/${terminalId}`, {
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        const json:Terminal = await response.json()
        return json

    }catch (error) {
        return error
    }

}