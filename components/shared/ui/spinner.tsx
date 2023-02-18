import { ClipLoader } from "react-spinners";

interface Props {
    size: number
}

export default function Spinner({size}: Props) {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <ClipLoader color='red' size={size} />
        </div>
    )
}