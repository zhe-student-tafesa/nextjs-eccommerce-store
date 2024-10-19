"use client";
import { Product } from "@prisma/client";
import React from "react";
interface CheckoutFormProps {
  product: Product;
  clientSecret: string;
}

const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
  console.log(product);
  console.log(clientSecret);
  return <div>CheckoutForm</div>;
};

export default CheckoutForm;
