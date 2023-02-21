import Footer from "./footer"
import Navbar from "./navbar"
import { withTranslation } from "next-i18next"
import { ReactNode } from "react";

interface Props {
    children: ReactNode,
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout