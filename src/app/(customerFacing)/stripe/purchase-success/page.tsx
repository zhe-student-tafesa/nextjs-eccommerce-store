import { ProductDetailInPurchase } from "@/components/checkoutForm/CheckoutForm";
import Stripe from "stripe";
import React from "react";
import { notFound } from "next/navigation";
import db from "@/db/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// payment_intent: is payment id
// use id and stripe to confirm successful
const PurchaseSuccessPage = async ({
  searchParams,
}: {
  searchParams: {
    payment_intent: string;
  };
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );
  if (paymentIntent.metadata.productId == null) {
    return notFound();
  }
  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });
  if (product == null) {
    return notFound();
  }
  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      <ProductDetailInPurchase product={product} />
      <Button className="mt-4" size={"lg"} asChild>
        {/* send a link: valid for 14 days, user can download file */}
        {isSuccess ? (
          <a
            href={`/products/download/${await createDownloadVerification(
              product.id
            )}`}
          >
            Download
          </a>
        ) : (
          <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
        )}
      </Button>
    </div>
  );
};

export default PurchaseSuccessPage;

// create downloadVerification
// return its' id
async function createDownloadVerification(prodcutId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        productId: prodcutId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
      },
    })
  ).id;
}
