import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        try{
            await connectToDatabase();

            const product = await Product.findById(req.query.productId);

            res.status(200).json({
                status: 'success',
                product
            })

        } catch(err: any){
            res.status(400).json({
                status: "fail",
                message: err.message,
              });
        }
    } else {
        res.status(404).json({status: 'fail', message: "The request response only GET Method"})
    }
}