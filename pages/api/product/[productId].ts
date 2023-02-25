import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();

      const product = await Product.findById(req.query.productId);

      if(!product){
        res.status(400).json({
            message: "Product not found"
        })
      }

      res.status(200).json({
        status: "success",
        product,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  } else if (req.method === "DELETE") {
    await connectToDatabase();

    const deletedProduct = await Product.findByIdAndDelete(req.query.productId)

    res.status(200).json({
      message: "Success",
      deletedProduct
    });

  } else {
    res
      .status(404)
      .json({
        status: "fail",
        message: "The request response only GET/DELETE Method",
      });
  }
}
// 63ef4a64e257a15ea3bf1e00