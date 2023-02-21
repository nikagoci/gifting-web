import PostSteps from "@/components/post/post-steps";
import SubmitPost from "@/components/post/submit-post";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ProductOverviewPage() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="py-8">
        <PostSteps
          status={{
            addProduct: "complete",
            productOverview: "complete",
            submitProduct: "current",
          }}
        />
      </div>
      <div className="py-8">
        <SubmitPost />
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

  if(context.locale){
    return {
      props: {
        session: JSON.parse(JSON.stringify(session)),
        ...( await serverSideTranslations(context.locale, ['addproduct', 'common']))
      }
    }
  }

  throw new Error('Locale not found')
}