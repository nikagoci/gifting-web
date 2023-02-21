import SignpUser from "@/components/forms/signup-user";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SignupPage() {
    return(
        <SignpUser />
    )
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    if(locale) {
      return {
        props: {
          ...( await serverSideTranslations(locale, ['registration', 'common']))
        },
      };
    }
  
    throw new Error('Context local not found')
  
    
  };