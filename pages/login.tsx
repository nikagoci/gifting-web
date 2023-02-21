import LoginUser from "@/components/forms/login-user";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function LoginPage() {
    return(
        <LoginUser />
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