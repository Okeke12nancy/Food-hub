"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface DownloadInvoiceButtonProps {
  orderId: string
  onDownload: () => Promise<void>
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function DownloadInvoiceButton({
  orderId,
  onDownload,
  variant = "outline",
  size = "default",
}: DownloadInvoiceButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      await onDownload()
      toast({
        title: "Invoice downloaded",
        description: `Invoice for order #${orderId} has been downloaded.`,
      })
    } catch (error) {
      console.error("Error downloading invoice:", error)
      toast({
        title: "Download failed",
        description: "There was an error downloading your invoice. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleDownload} disabled={isLoading}>
      <Download className="mr-2 h-4 w-4" />
      {isLoading ? "Downloading..." : "Download Invoice"}
    </Button>
  )
}
