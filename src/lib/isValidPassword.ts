export async function isValidPassword(password: string, adminHashedPassword: string | undefined) {
    return (await hashPassword(password)) == adminHashedPassword
}

async function hashPassword(password: string) {
    const arrayBuffer = await crypto.subtle.digest(
        "SHA-512",
        new TextEncoder().encode(password)
    )
     console.log(Buffer.from(arrayBuffer).toString('base64'))
    return Buffer.from(arrayBuffer).toString('base64')
}