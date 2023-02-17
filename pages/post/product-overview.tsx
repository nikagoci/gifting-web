import PostOverview from "@/components/post/post-overview";
import PostSteps from "@/components/post/post-steps";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function ProductOverviewPage() {
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
      <h1 className="text-2xl font-bold text-center">
          How your post will be shown
      </h1>
        <PostOverview />
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

  return {
    props: {
      session: JSON.parse(JSON.stringify(session))
    }
  }
}