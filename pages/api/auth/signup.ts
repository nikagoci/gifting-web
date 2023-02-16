import { hashPassword } from "@/database/auth";
import connectToDatabase from "@/database/connectDB";
import User from "@/database/model/userModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST'){
        try{
            await connectToDatabase();

            const {email, password, phoneNumber} = req.body;
            
            const existingUser = await User.findOne({email})

            if(existingUser) {
                res.status(422).json({message: 'User already exists'})
                return;
            }

            const hashedPassword = await hashPassword(password)

            const newUser = await User.create({
                email,
                password: hashedPassword,
                phoneNumber
            })


            res.status(201).json({
                status: 'success',
                user: newUser
            })

        } catch(err: any){
            res.status(400).json({
                status: 'fail',
                message: err.message
            })
        }
    } else{
        res.send(404)
    }
    
}