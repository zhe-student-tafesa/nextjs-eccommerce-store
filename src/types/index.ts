import { Product } from "@prisma/client";

export interface ProductGridSectionProps {
    productsFetcher: () => Promise<Product[]>,
    title: string
}


export interface ProductCardProps {

    name: string
    priceInCents: number
    description: string
    id: string
    imagePath: string
}