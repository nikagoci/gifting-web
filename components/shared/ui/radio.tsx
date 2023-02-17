interface Props{
    label: string;
    id: string;
    register?: any;
}

export default function Radio({label, id, register}: Props) {
    return (
        <div className="flex items-center justify-center">
            <label htmlFor={id} className="mr-2">{label}</label>
            <input value={id} type="radio" name='radio' id={id} {...register} />
        </div>

    )
}