import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+12.4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+249</div>
                <p className="text-xs text-muted-foreground">+18.1% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Your revenue for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your most recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your sales performance</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SalesAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <BarChart className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">Revenue Chart</h3>
          <p className="text-sm text-muted-foreground">Bar chart showing daily revenue for the past 30 days</p>
        </div>
      </div>
    </div>
  )
}

function SalesAnalytics() {
  return (
    <div className="h-[400px] w-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
          <TrendingUp className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">Sales Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Detailed charts showing sales trends, popular products, and customer demographics
          </p>
        </div>
      </div>
    </div>
  )
}

function RecentOrders() {
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      status: "Delivered",
      total: "$42.50",
      date: "2 hours ago",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      status: "Processing",
      total: "$36.25",
      date: "3 hours ago",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      status: "Delivered",
      total: "$28.75",
      date: "5 hours ago",
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      status: "Pending",
      total: "$52.00",
      date: "6 hours ago",
    },
  ]

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">{order.customer}</p>
            <p className="text-xs text-muted-foreground">{order.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium">{order.total}</p>
              <p className="text-xs text-muted-foreground">{order.date}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = "bg-gray-100"
  let textColor = "text-gray-800"

  if (status === "Delivered") {
    bgColor = "bg-green-100"
    textColor = "text-green-800"
  } else if (status === "Processing") {
    bgColor = "bg-blue-100"
    textColor = "text-blue-800"
  } else if (status === "Pending") {
    bgColor = "bg-yellow-100"
    textColor = "text-yellow-800"
  }

  return <div className={`rounded-full px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}>{status}</div>
}
