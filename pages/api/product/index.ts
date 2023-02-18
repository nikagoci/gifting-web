import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import User from "@/database/model/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = await getSession({req: req});

      if(!session){
        res.status(401).json({
          message: 'Not authenticated'
        })
        return ;
      }
      const { name, city, imageSrc, description, gender, category } = req.body;
      await connectToDatabase();

      const user = await User.findOne({email: session?.user?.email});

      const newProduct = await Product.create({
        name,
        city,
        imageSrc,
        description,
        gender,
        category,
        creator: user._id
      });


      res.status(201).json({
        status: "success",
        product: newProduct,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  } else {
    res.status(404).json({
      message: "Try different method",
    });
  }
}
