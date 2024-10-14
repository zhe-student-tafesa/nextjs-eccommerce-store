import AdminPageHeader from "@/components/adminPageHeader/AdminPageHeader";
import ProductForm from "@/components/productForm/ProductForm";
import db from "@/db/db";


export default async function EditProductPage({ params: { id }, }: {
    params: { id: string }
}) {
    const product = await db.product.findUnique({
        where: { id: id }
    })
    console.log(product)
    return (
        <>
            <AdminPageHeader >Edit Product</AdminPageHeader>
            <ProductForm product={product} />
        </>
    )
}