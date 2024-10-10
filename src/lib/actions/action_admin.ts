'use server'

import db from "@/db/db"
import { describe } from "node:test"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"

const fileSchema = z.instanceof(File, {
    message: 'Required'
})

// if not submit image,     do not do the startsWith('image/') check
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith('image/')
)

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, 'Required'),
    image: imageSchema.refine(file => file.size > 0, 'Required')
})
export async function addProduct(previousState:unknown, formData: FormData) {
    // console.log(formData)
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data;
    /// 1. use fs module save file to file system

    // SAVE  file
    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
    // SAVE  image
    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    /// 2. save path to DB

    await db.product.create({
        data: {
            isAvailableForPurchase: false,
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath
        }
    })
    redirect("/admin/products")
}