
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises'

export async function GET(
    req: NextRequest,
    { params: { downloadVerificationId } }:
        { params: { downloadVerificationId: string } }
) {
    // before download: verify the purchase using stripe
    const data = await db.downloadVerification.findUnique({
        where: {
            id: downloadVerificationId,
            /// not expire
            expiresAt: { gt: new Date() }
        },
        select: {
            // productId is FOREIGN KEY in TABLE "DownloadVerification"
            product: {
                select: {
                    filePath: true,
                    name: true
                }
            }
        }

    })
    // if null, redirect to expired page
    if (data == null) {
        return NextResponse.redirect(new URL("/products/download/expired", req.url))
    }

    // download
    const product = data.product
    // copy from admin: download
    const { size } = await fs.stat(product.filePath)
    const file = await fs.readFile(product.filePath)
    const extension = product.filePath.split(".").pop()
    // use these info return a download link
    // file name: product.name . extension
    return new NextResponse(
        file,
        {
            headers: {
                'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
                'Content-Length': size.toString(),
            }
        }
    )
    return new NextResponse("Hi")
}