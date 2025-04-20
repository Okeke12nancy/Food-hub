"use client"

import { useState } from "react"
import { BarChart3, Calendar, DollarSign, LineChart, PieChart, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last {timeRange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+12.4% from last {timeRange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.32</div>
            <p className="text-xs text-muted-foreground">+2.3% from last {timeRange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+249</div>
            <p className="text-xs text-muted-foreground">+18.1% from last {timeRange}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Your sales performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <LineChart className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Sales Chart</h3>
                  <p className="text-sm text-muted-foreground">Line chart showing sales trends over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Time of Day</CardTitle>
                <CardDescription>When your customers are ordering</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Hourly Sales</h3>
                    <p className="text-sm text-muted-foreground">Bar chart showing sales by hour of day</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales by Payment Method</CardTitle>
                <CardDescription>How your customers are paying</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <PieChart className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">Pie chart showing distribution of payment methods</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Your best performing products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Spicy Chicken Burger", sales: 245, revenue: "$3,182.55" },
                  { name: "Vegetable Pizza", sales: 187, revenue: "$2,803.13" },
                  { name: "Chocolate Milkshake", sales: 156, revenue: "$934.44" },
                  { name: "French Fries", sales: 142, revenue: "$566.58" },
                  { name: "Chicken Wings", sales: 128, revenue: "$1,406.72" },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{index + 1}.</div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.sales} orders</div>
                      </div>
                    </div>
                    <div className="text-right font-medium">{product.revenue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Category Performance</CardTitle>
              <CardDescription>Sales by product category</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <PieChart className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Category Sales</h3>
                  <p className="text-sm text-muted-foreground">Pie chart showing sales distribution by category</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Demographics</CardTitle>
              <CardDescription>Insights about your customer base</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <PieChart className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Customer Age Groups</h3>
                  <p className="text-sm text-muted-foreground">Pie chart showing customer age distribution</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>New vs returning customers</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <BarChart3 className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Customer Retention</h3>
                    <p className="text-sm text-muted-foreground">Chart showing new vs returning customers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Your most valuable customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", orders: 24, spent: "$542.80" },
                    { name: "Jane Smith", orders: 18, spent: "$423.50" },
                    { name: "Robert Johnson", orders: 15, spent: "$387.25" },
                    { name: "Emily Davis", orders: 12, spent: "$298.75" },
                    { name: "Michael Wilson", orders: 10, spent: "$245.90" },
                  ].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{index + 1}.</div>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.orders} orders</div>
                        </div>
                      </div>
                      <div className="text-right font-medium">{customer.spent}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
