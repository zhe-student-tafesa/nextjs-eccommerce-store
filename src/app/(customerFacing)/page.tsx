import ProductCard from "@/components/productCard/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { ProductGridSectionProps } from "@/types";
import { ArrowRight } from "lucide-react";
// the most popular products
function getMostPopularProducts() {
  return db.product.findMany({
    orderBy: {
      orders: { _count: "desc" }
    },
    where: { isAvailableForPurchase: true },
    // show first 6
    take: 6
  })
}

// the newest products
function getNewestProducts() {
  return db.product.findMany({
    orderBy: {
      createdAt: "desc"
    },
    where: { isAvailableForPurchase: true },
    // show first 6
    take: 6
  })
}
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection productsFetcher={getMostPopularProducts} title={"Most Popular"} />
      <ProductGridSection productsFetcher={getNewestProducts} title={"Newest"} />
    </main>
  );
}



async function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant={"outline"} asChild>
          <Link href={"/products"} className="space-x-2">
            <span>  View All</span>
            <ArrowRight className="size-4" />

          </Link>
        </Button>
      </div>
      {/* grid layout*/}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {(await productsFetcher()).map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}

      </div>
    </div>
  );
}