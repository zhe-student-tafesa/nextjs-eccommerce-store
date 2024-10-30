import db from "@/db/db"
import { notFound } from "next/navigation"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"

export async function deleteUser(id: string) {
    const user = await db.user.delete({
        where: { id: id }
    })

    if (user === null) {
        return notFound()
    }
    return user
}