"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from "next/navigation"
import React, { Component, ComponentProps, ReactNode } from 'react'

// Nav is a functional component that receives a children prop. Children are child components, which can be any React nodes.
const Nav = ({ children }: { children: ReactNode }) => {
    return (
        // This navigation container uses flex layout to center the child components.
        <nav className='bg-primary text-primary-foreground flex justify-center px-4'>
            {children}
        </nav>
    )
}

export default Nav

// Omit<ComponentProps<typeof Link>, 'className'>: 
// This is TypeScript syntax, which means that we remove the className property when using the Link component.
export function NavLink(
    props: Omit<ComponentProps<typeof Link>, 'className'>
) {
    const pathname = usePathname()
    return <Link {...props}
    // cn: used to dynamically generate CSS classes.
    // className is used to dynamically set the class name. If the current path name is equal to props.href, the bg-background text-foreground class is applied to achieve the selected state style of the current navigation item.
        className={cn(
            "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
            pathname === props.href && "bg-background text-foreground"
        )}
    />
}