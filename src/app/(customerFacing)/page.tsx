import db from "@/db/db";
import { ProductGridSectionProps } from "@/types";
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

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection productsFetcher={getMostPopularProducts} />
      <ProductGridSection productsFetcher={getNewestProducts} />
    </main>
  );
}



function ProductGridSection({ productsFetcher }: ProductGridSectionProps) {
  return (
    <main className="space-y-12">

    </main>
  );
}
