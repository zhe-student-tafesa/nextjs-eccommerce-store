import Nav, { NavLink } from "@/components/nav/Nav";

///  Tell nextjs not to cash any of admin page!!
export const dynamic = "force-dynamic"

//  admin page layout with navigation links
export default function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Nav >
                <NavLink href={"/admin"}>Dashboard</NavLink>
                <NavLink href={"/admin/products"}>Products</NavLink>
                <NavLink href={"/admin/users"}>Users</NavLink>
                <NavLink href={"/admin/orders"}>Sales</NavLink>
            </Nav>
            <div className="container my-6">
                {children}
            </div>
        </>
    );
}