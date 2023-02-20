import Link from "next/link";
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
    full?: boolean;
    padding?: string;
    href: string;
    type?: string;
    onClick?: () => void
}

export default function Button({ children, full, padding, href, onClick }: Props) {

    if (full) {
        return <Link href={href}
            type="button"
            className={`text-center inline-flex items-center  text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${padding ? padding : 'px-8 py-2'}`}
            onClick={onClick}
        >
            {children}
        </Link>
    }

    return (
        <Link href={href}
            type="button"
            className={`text-center inline-flex items-center text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${padding ? padding : 'px-8 py-2'}`}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}