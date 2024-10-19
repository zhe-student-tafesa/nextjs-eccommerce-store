"use server"

import db from "@/db/db";

export async function userOrderExists(email: string, productId: string) {
    //  only query id, so more fast:  select: { id: true }
    const order = await db.order.findFirst({
        where: {
            user: { email },
            productId
        },
        select: { id: true }
    })
    if (order == null) {
        return false;
    }
    return true;
}