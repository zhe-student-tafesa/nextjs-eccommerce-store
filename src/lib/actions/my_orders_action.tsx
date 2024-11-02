"use server";
import db from "@/db/db";
import OrderHistoryEmail from "@/email/OrderHistory";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.string().email();
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function getMyOrders(
  prevState: unknown,
  formData: FormData
): Promise<{
  message?: string;
  error?: string;
}> {
  const result = emailSchema.safeParse(formData.get("email"));
  if (result.success === false) {
    return { error: "Invalid email address" };
  }

  const user = await db.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });

  // security precaution:
  if (user == null) {
    return {
      message:
        "Check your email to view your order history and download your products.",
    };
  }

  // many orders: async
  const orders = user.orders.map(async (order) => {
    return {
      ...order,
      // 7 days expired
      downloadVerificationId: (
        await db.downloadVerification.create({
          data: {
            expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60 * 7),
            productId: order.product.id,
          },
        })
      ).id,
    };
  });

  // send email
  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: "Order History",
    // !! await Promise
    react: <OrderHistoryEmail orders={await Promise.all(orders)} />,
  });
  if (data.error) {
    return {
      error: "There was an error sending your email. Please try again.",
    };
  }

  return {
    message:
      "Check your email to view your order history and download your products.",
  };
}
