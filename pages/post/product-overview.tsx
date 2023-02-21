import PostOverview from "@/components/post/post-overview";
import PostSteps from "@/components/post/post-steps";
import connectToDatabase from "@/database/connectDB";
import User from "@/database/model/userModel";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  user: {
    _id: string;
    email: string;
    password: string;
    phoneNumber: string
  }
}

export default function ProductOverviewPage({user}: Props) {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="py-8">
        <PostSteps
          status={{
            addProduct: "complete",
            productOverview: "current",
            submitProduct: "upcoming",
          }}
        />
      </div>

      <div className="py-8">
        <PostOverview user={user} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const session = await getSession({req: context.req})
  if(!session){
    return {
      redirect: {
        destination: '/signup',
        permanent: false
      }
    }
  }
  await connectToDatabase();

  const user = await User.findOne({email: session.user?.email})

  if(context.locale){
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        ...( await serverSideTranslations(context.locale, ['addproduct', 'common']))
      }
    }
  }

  throw new Error('Locale not found')

}