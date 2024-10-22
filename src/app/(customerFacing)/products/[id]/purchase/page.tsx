import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import db from "@/db/db";
import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PurchasePage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await db.product.findUnique({
    where: { id: id },
  });

  if (product == null) {
    return notFound();
  }

  // server: tell stripe that we have a customer want to buy
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product?.priceInCents as number,
    currency: "AUD",
    // use id to hook customer with product
    metadata: { productId: product?.id as string },
  });

  // we can see 'paymentIntent.client_secret' as paymentId, 
  // we will use client_secret in client side
  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  // Client side use: client_secret
  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
};

export default PurchasePage;
