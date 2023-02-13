import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        try{
            
            await connectToDatabase();
            
            const products = await Product.find();
    
            res.status(200).json({
                status: 'success',
                quantity: products.length,
                products
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