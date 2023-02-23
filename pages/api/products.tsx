import connectToDatabase from "@/database/connectDB";
import Product from "@/database/model/productModel";
import { NextApiRequest, NextApiResponse } from "next";

function pagination(req: NextApiRequest) {
  let limit: number = 100;
  let skip: number = 0;
  if (req.query.page && req.query.limit) {
    const page = +req.query.page || 1;
    limit = +req.query.limit;
    skip = (page - 1) * limit;
  } else {
    limit = 0;
  }

  return { skip, limit };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectToDatabase();

      const { skip, limit } = pagination(req);

      const allProducts = await Product.find();
      let categories: string[] = [];
      let genders: string[] = [];
      let products;

      if (
        req.query.category &&
        typeof req.query.category === "string" &&
        req.query.gender &&
        typeof req.query.gender === "string"
      ) {
        categories = req.query.category.split(".");
        genders = req.query.gender.split(".");
        products = await Product.find({
          category: { $in: categories },
          gender: { $in: genders },
        })
          .skip(skip)
          .limit(limit);
      } else if (req.query.gender && typeof req.query.gender === "string") {
        genders = req.query.gender.split(".");
        products = await Product.find({ gender: { $in: genders } })
          .skip(skip)
          .limit(limit);
      } else if (req.query.category && typeof req.query.category === "string") {
        categories = req.query.category.split(".");
        products = await Product.find({ category: { $in: categories } })
          .skip(skip)
          .limit(limit);
      } else {
        products = await Product.find().skip(skip).limit(limit);
      }

      res.status(200).json({
        status: "success",
        totalQuantity: allProducts.length,
        quantity: products.length,
        products,
      });
    } catch (err: any) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  } else {
    res.send(404);
  }
}
