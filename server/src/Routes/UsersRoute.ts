import * as sha512 from 'js-sha512'
import { User } from "../Models/User";
import express from "express";
import { UserForm } from "../FormValidators/User/UserForm";
import { validationResult } from "express-validator";
import { UserUpdateForm } from "../FormValidators/User/UserUpdateForm"
import { sign } from 'crypto';

const router = express.Router()

router.post("/users", UserForm ,async (
    req:express.Request, 
    res:express.Response
) => {

    const formErrors = validationResult(req)
    
    if (!formErrors.isEmpty()) {

        res.json({
            status : 400,
            message : "Informations are not good",
            errors : formErrors
        })

    } else {

        const passwordHashed = sha512.sha512(req.body.password)
        const userDataUnhashed = req.body
        const date = new Date()
        const userDataHashed = {...userDataUnhashed, password:passwordHashed, createdAt:date, role : "user"}

        let user = new User()
        user = userDataHashed

        const result = await User.save(user)

        res.json({
            status : 200,
            message: "User created",
            result : result
        })

    }

})

router.get("/auth", async(req, res) => {

    const passwordHashed = sha512.sha512(req.body.password)
    const email = req.body.email

    const user = await User.findOne({
        where:{
            mail : email,
            password : passwordHashed
        }
    })

    if (user) {
        // const token = jwt.sign({user}, tokenKey)
        res.json({
            status : 200,
            result : user
            // token : token
        })
    } else {
        res.json({
            status : 400,
            message : "Invalid credentials"
        })
    }

})

router.put("/users/:id",UserUpdateForm, async(
    req:express.Request, 
    res:express.Response
)=> {

    const userId = req.params.id 
    let updatedInfo = req.body    

    const userUpdated = await User.findOne(userId) as User

    if (userUpdated) {

        if (req.body.password) {

            const password = req.body.password
            const hashedPassword = sha512.sha512(password)

            updatedInfo = {...updatedInfo, password:hashedPassword}
            
        } 

        const updateAction = await User.update(userId, updatedInfo)
        const userChanged = await User.findOne(userId)

        res.json({
            status : 200,
            message : "User updated",
            response : updateAction,
            user : userChanged
        })

    } else {

        res.json({
            status : 400,
            message : "your product doest not exist"
        })

    }

})

router.delete("/users/:id", async(req,res) => {

    const userId = req.params.id
    const user = await User.findOne(userId) as User

    if (user) {

        const deleteAction = await User.delete(userId)

        res.json({
            status : 200,
            message : "User deleted",
            result : deleteAction,
            user : user
        })

    } else {

        res.json({
            status : 400,
            message : "User does not exist"
        })

    }

})

export default router