interface Props{
    label: string;
    id: string
}

export default function Radio({label, id}: Props) {
    return (
        <div className="flex items-center justify-center">
            <label htmlFor={id} className="mr-2">{label}</label>
            <input type="radio" name='radio' id={id} />
        </div>

    )
}