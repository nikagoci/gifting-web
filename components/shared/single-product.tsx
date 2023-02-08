interface Props {
    product: {
        id: number;
        name: string;
        href: string;
        price: string;
        imageSrc: string;
        imageAlt: string;
    }
}

export default function SingleProduct({ product }: Props) {
    return (
        <a key={product.id} href={product.href} className="group">
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
        </a>
    )
}