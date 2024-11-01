'use server'
import db from "@/db/db"
import { notFound } from "next/navigation"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"

export async function deleteOrder(id: string) {
    const order = await db.order.delete({
        where: { id: id }
    })

    if (order === null) {
        return notFound()
    }
    return order
}