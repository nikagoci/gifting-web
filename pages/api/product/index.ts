import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, city, imageSrc, description, condition, gender, category } = req.body;
      await connectToDatabase();

      const newProduct = await Product.create({
        name,
        city,
        imageSrc,
        description,
        condition,
        gender,
        category
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
