"use client";
import { Product } from "@prisma/client";
import React from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface CheckoutFormProps {
  product: Product;
  clientSecret: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
  console.log(product);
  console.log(clientSecret);
  //   Elements like context
  // options : can add CSS
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <ProductDetailInPurchase product={product} />
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <Form priceInCents={product.priceInCents} />
      </Elements>
    </div>
  );
};

export default CheckoutForm;

function Form({ priceInCents }: { priceInCents: number }) {
  const stripe = useStripe();
  // elements has all the payment info
  const elements = useElements();
  function handleSubmit() {}
  //  use real form
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <PaymentElement />
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            size={"lg"}
            disabled={stripe == null || elements == null}
          >
            Purchase - {formatCurrency(priceInCents / 100)}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function ProductDetailInPurchase({ product }: { product: Product }) {
  const { imagePath, name, priceInCents, description } = product;
  return (
    <div className="flex gap-4 items-center">
      <div className="relative aspect-video flex-shrink-0 w-1/3">
        <Image src={imagePath} fill alt={name} className="object-cover" />
      </div>
      <div>
        <div className="text-lg">{formatCurrency(priceInCents / 100)}</div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="line-clamp-3 text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}
