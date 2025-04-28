"use client"

import { useState } from "react"
import { Clock, Eye, Filter, Search, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function OrdersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)

  // Sample order data
  const orders: Order[] = [
    {
      id: "ORD-001",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        address: "123 Main St, Anytown, CA 12345",
      },
      items: [
        { id: "1", name: "Spicy Chicken Burger", quantity: 2, price: 12.99 },
        { id: "3", name: "Chocolate Milkshake", quantity: 1, price: 5.99 },
      ],
      total: 31.97,
      status: "Delivered",
      date: "2023-06-15T14:30:00",
      payment: "Credit Card",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 345 678 901",
        address: "456 Oak Ave, Somewhere, NY 54321",
      },
      items: [
        { id: "2", name: "Vegetable Pizza", quantity: 1, price: 14.99 },
        { id: "5", name: "French Fries", quantity: 2, price: 3.99 },
      ],
      total: 22.97,
      status: "Processing",
      date: "2023-06-15T16:45:00",
      payment: "PayPal",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Robert Johnson",
        email: "robert.j@example.com",
        phone: "+1 456 789 012",
        address: "789 Pine Rd, Elsewhere, TX 67890",
      },
      items: [
        { id: "6", name: "Chicken Wings", quantity: 2, price: 10.99 },
        { id: "4", name: "Caesar Salad", quantity: 1, price: 8.99 },
        { id: "3", name: "Chocolate Milkshake", quantity: 2, price: 5.99 },
      ],
      total: 42.95,
      status: "Pending",
      date: "2023-06-15T17:30:00",
      payment: "Cash on Delivery",
    },
    {
      id: "ORD-004",
      customer: {
        name: "Emily Davis",
        email: "emily.d@example.com",
        phone: "+1 567 890 123",
        address: "101 Maple Dr, Nowhere, FL 13579",
      },
      items: [
        { id: "2", name: "Vegetable Pizza", quantity: 2, price: 14.99 },
        { id: "5", name: "French Fries", quantity: 1, price: 3.99 },
      ],
      total: 33.97,
      status: "Cancelled",
      date: "2023-06-15T18:15:00",
      payment: "Credit Card",
    },
    {
      id: "ORD-005",
      customer: {
        name: "Michael Wilson",
        email: "michael.w@example.com",
        phone: "+1 678 901 234",
        address: "202 Cedar Ln, Anywhere, WA 24680",
      },
      items: [
        { id: "1", name: "Spicy Chicken Burger", quantity: 1, price: 12.99 },
        { id: "3", name: "Chocolate Milkshake", quantity: 1, price: 5.99 },
        { id: "5", name: "French Fries", quantity: 1, price: 3.99 },
      ],
      total: 22.97,
      status: "Delivered",
      date: "2023-06-15T12:00:00",
      payment: "PayPal",
    },
  ]

  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (statusFilter !== "all" && order.status.toLowerCase() !== statusFilter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  const handleViewInvoice = (orderId: string) => {
    router.push(`/admin/orders/${orderId}/invoice`)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Manage your customer orders and track their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(order.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Invoice
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Complete information about the order</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Order ID: {selectedOrder.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    <Clock className="mr-1 inline-block h-3 w-3" />
                    {new Date(selectedOrder.date).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(selectedOrder.status)}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-semibold">Customer Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name:</p>
                    <p>{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email:</p>
                    <p>{selectedOrder.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone:</p>
                    <p>{selectedOrder.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method:</p>
                    <p>{selectedOrder.payment}</p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p className="text-muted-foreground">Delivery Address:</p>
                  <p>{selectedOrder.customer.address}</p>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-semibold">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p>${item.price.toFixed(2)}</p>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-medium">
                    <p>Total</p>
                    <p>${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Select defaultValue={selectedOrder.status.toLowerCase()}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button onClick={() => handleViewInvoice(selectedOrder.id)}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Invoice
                  </Button>
                  <Button>Update Status</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  total: number
  status: string
  date: string
  payment: string
}
