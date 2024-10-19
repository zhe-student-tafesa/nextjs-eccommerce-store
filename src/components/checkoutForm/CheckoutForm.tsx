"use client";
import { Product } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import {
  Elements,
  LinkAuthenticationElement,
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
import { userOrderExists } from "@/lib/actions/action_purchase";

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
        <Form priceInCents={product.priceInCents} productId={product.id} />
      </Elements>
    </div>
  );
};

export default CheckoutForm;

function Form({
  priceInCents,
  productId,
}: {
  priceInCents: number;
  productId: string;
}) {
  const stripe = useStripe();
  // elements has all the payment info
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) {
      return;
    }
    setIsLoading(true);

    // check for existing order: begin
    const orderExists = await userOrderExists(email, productId);
    if (orderExists) {
      setErrorMessage(
        "You have already purchased this product. Try downloading it from Orders page"
      );
      setIsLoading(false);
      return;
    }
    // check for existing order: end

    //  if ok, redirec to ${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success
    //  if fail go to 'then'
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        // if it is client's mis operate cause the error
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message as string);
        } else {
          // for developer
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setIsLoading(false));
  }
  //  use real form
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {/* show err msg */}
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <PaymentElement />
          {/* add user email field */}
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            size={"lg"}
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Purchase - ${formatCurrency(priceInCents / 100)}`}
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
