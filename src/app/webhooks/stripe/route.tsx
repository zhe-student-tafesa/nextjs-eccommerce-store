// THIRD time to ensure stripe purchase success: use webhook
// THIRD time to ensure stripe purchase success: use webhook
// THIRD time to ensure stripe purchase success: use webhook
// ## wait for a web hook from Stripe
// ## then create a customer and an order.

import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

// This will be called by stripe when we have a successful payment;
export async function POST(req: NextRequest) {
  // access the webhooks
  // verify the info from STRIPE
  // stripe-signature : be used to compare against our actual web hook

  // const rawBody = await req.text();
  // console.log("Raw Body1029:", rawBody);

  // const stripeSignature = req.headers.get("stripe-signature") as string;
  // console.log("2024Stripe signature:", stripeSignature);

  try {
    const event = await stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    // console.log("event1029", event);
    if (event.type === "charge.succeeded") {
      console.log("event1029:", event);
      const charge = event.data.object;
      // console.log("charge.metadata:", charge.metadata);
      // prepare all the info to create an order
      const productId = charge.metadata.productId;

      // ！！！must see stripeData.json
      const email = charge.billing_details.email;
      console.log("productId-:", productId);
      console.log("email-:", email);

      // ！！！must see stripeData.json
      const pricePaidInCents = charge.amount;
      // double check is this product exist
      const product = await db.product.findUnique({ where: { id: productId } });
      if (product == null || email == null) {
        // let stripe know: this is not what we expect
        return new NextResponse("Bad Request", { status: 400 });
      }
      // create or update this user:  where: { email },
      // if email not exist,  create
      // else,  update
      const userFields = {
        email,
        orders: { create: { productId, pricePaidInCents } },
      };
      // {orders}： Object Destructuring
      // orders: [order] means to take out the first element in the orders array and name it order, so that you can use order directly without accessing orders[0] every time.
      const {
        orders: [order],
      } = await db.user.upsert({
        where: { email },
        create: userFields,
        update: userFields,
        // after finish: read order
        select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
      });

      // 14 days
      const downloadVerification = await db.downloadVerification.create({
        data: {
          productId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        },
      });
      // after create: send user an email like receipt
      // receipt: order + downloadVerification
      // use resend
      await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        subject: "Order Confirmation",
        to: email,
        react: <h1>Hi </h1>,
      });
      console.log("event1029-real success");
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    const message = (error as Error).message; //
    console.error(`Webhook Error-catch1029: ${message}`);
    return NextResponse.json({ error: "Webhook Error 1029" }, { status: 400 });
  }
}
