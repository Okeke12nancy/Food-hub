"use client"

import { useRef, useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InvoiceTemplate } from "@/components/invoice/invoice-template"
import { DownloadInvoiceButton } from "@/components/invoice/download-invoice-button"

export default function InvoicePage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string
  const invoiceRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    // In a real app, you would fetch the order data from your API
    // This is mock data for demonstration purposes
    const mockOrder = {
      id: orderId,
      invoiceNumber: `INV-${orderId}`,
      orderDate: new Date(),
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      customerAddress: "123 Main St\nAnytown, CA 12345",
      items: [
        { id: "1", name: "Spicy Chicken Burger", quantity: 2, price: 12.99 },
        { id: "3", name: "Chocolate Milkshake", quantity: 1, price: 5.99 },
        { id: "5", name: "French Fries", quantity: 1, price: 3.99 },
      ],
      subtotal: 35.96,
      tax: 3.6,
      total: 39.56,
      paymentMethod: "Credit Card",
      vendorName: "Burger Palace",
      vendorAddress: "456 Food St\nAnytown, CA 12345",
    }

    // Simulate API call
    setTimeout(() => {
      setOrder(mockOrder)
      setIsLoading(false)
    }, 500)
  }, [orderId])

  const downloadInvoice = async () => {
    if (!invoiceRef.current) return

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    pdf.save(`invoice-${orderId}.pdf`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4">Loading invoice...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <DownloadInvoiceButton orderId={orderId} onDownload={downloadInvoice} />
      </div>

      <Card className="p-0 overflow-hidden">
        <InvoiceTemplate ref={invoiceRef} {...order} />
      </Card>
    </div>
  )
}
