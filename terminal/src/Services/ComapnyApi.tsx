import { Company } from "../Interfaces/Company";

const baseUrl = "http://localhost:3000"

export const createCompany = async (company:Company) => {

    try {
     
        const response = await fetch(`${baseUrl}/companies`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(company)
        })
    
        const json = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getCompanies = async () => {

    try {
     
        const response = await fetch(`${baseUrl}/companies`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Company[] = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const getCompany = async (companyId:number) => {

    try {
     
        const response = await fetch(`${baseUrl}/companies/${companyId}`, {
            method:"GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
    
        const json:Company = await response.json()
        return json

    } catch (error) {
        
        return error

    }

}

export const changeCompany = async (companyId:number, changes:Company) => {

    try {

        const response = await fetch(`${baseUrl}/companies/${companyId}`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            body : JSON.stringify(changes)
        })

        const json:Company = await response.json()
        return json

    } catch (error) {
        return error    
    }

}

export const deleteCompany = async (companyId:number) => {

    try {

        const response = await fetch(`${baseUrl}/commands/${companyId}`, {
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })

        const json:Company = await response.json()
        return json

    }catch (error) {
        return error
    }

}