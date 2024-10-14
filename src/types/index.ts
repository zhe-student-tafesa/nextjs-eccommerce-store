import { Product } from "@prisma/client";

export interface ProductGridSectionProps {
    productsFetcher: () => Promise<Product[]>
}