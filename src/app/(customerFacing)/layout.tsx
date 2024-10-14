import Nav, { NavLink } from "@/components/nav/Nav";


export default function CustomerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Nav >
                <NavLink href={"/"}>Home</NavLink>
                <NavLink href={"/products"}>Products</NavLink>
                <NavLink href={"/orders"}>My Orders</NavLink>
            </Nav>
            <div className="container my-6">
                {children}
            </div>
        </>
    );
}