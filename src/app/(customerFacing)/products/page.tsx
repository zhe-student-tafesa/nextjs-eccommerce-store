import { wait } from "@/app/admin/page";
import ProductCard, { ProductCardSkeleton } from "@/components/productCard/ProductCard";
import db from "@/db/db";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <Suspense
        fallback={
          <>
          {/* step 3 */}
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }>
          {/* step 4 */}
        <ProductsPageSuspense productsFetcher={getProducts} />
      </Suspense>


    </div>
  );
}


async function ProductsPageSuspense({
  productsFetcher }:
  { productsFetcher: () => Promise<Product[]> }
) {
  // For test begin: wait 1S, then call api, so we can see ProductCardSkeleton working
  await wait(1000)
  // For test end
  // step 2
  return (await productsFetcher()).map(
    (product) => (
      <ProductCard
        key={product.id}
        {...product}
      />
    )
  )
}

// step 1
function getProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy:{name:"asc"}
  })
}