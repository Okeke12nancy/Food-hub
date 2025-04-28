"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Package, ShoppingCart, LayoutDashboard, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === "/admin",
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: <Package className="h-5 w-5" />,
      active: pathname === "/admin/products",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      active: pathname === "/admin/orders",
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      active: pathname === "/admin/analytics",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setOpen(false)}>
                <Package2Icon className="h-6 w-6" />
                <span className="sr-only">Chow Hub</span>
              </Link>
              <div className="my-4 h-[1px] w-full bg-border"></div>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                    route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  } transition-colors hover:text-primary`}
                  onClick={() => setOpen(false)}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
              <Button variant="outline" className="mt-auto flex items-center gap-2 text-muted-foreground">
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Package2Icon className="h-6 w-6" />
          <span>Chow Hub</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="Vendor" />
            <AvatarFallback>VN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                } transition-colors hover:text-primary`}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
            <div className="mt-auto"></div>
            <Button variant="outline" className="mt-6 flex items-center gap-2 text-muted-foreground">
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}
