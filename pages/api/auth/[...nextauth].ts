import { verifyPassword } from "@/database/auth";
import connectToDatabase from "@/database/connectDB";
import User from "@/database/model/userModel";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await connectToDatabase();

        const user = await User.findOne({
          email,
        });

        if(!user){
            throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
            password, user.password
        )

        if(!isValid) {
            throw new Error("Could not log you in!")
        }

        return {
          id: "1234",
          email: email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
