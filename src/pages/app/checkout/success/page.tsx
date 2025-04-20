"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, ShoppingBag } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DownloadInvoiceButton } from "@/components/invoice/download-invoice-button"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, you would get the order ID from the URL params or from your state management
    // For this example, we'll use a mock order ID or get it from the URL
    const id =
      searchParams.get("orderId") ||
      "ORD-" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")
    setOrderId(id)
  }, [searchParams])

  const handleDownloadInvoice = async () => {
    if (!orderId) return

    // Navigate to the invoice page which will handle the PDF generation
    router.push(`/invoice/${orderId}`)
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          <CardDescription>Thank you for your order. Your payment has been processed successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            You will receive an email confirmation shortly. Please download your invoice to show to the vendor upon
            delivery.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <DownloadInvoiceButton
            orderId={orderId || ""}
            onDownload={handleDownloadInvoice}
            variant="default"
            size="default"
          />
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
