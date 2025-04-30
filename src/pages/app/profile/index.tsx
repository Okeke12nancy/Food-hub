"use client"


import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Edit, Save, X, Upload, ChevronRight, Clock, CreditCard, MapPin, Package, Wallet } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"




const mockUser = {
  id: "user-123",
  fullName: "Nancy Ogadinma",
  email: "Nancy@example.com",
  phoneNumber: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  gender: "male",
  avatarUrl: "",
  joinedDate: "January 2023",
}




const mockOrders = [
  {
    id: "order-1001",
    date: "May 15, 2023",
    restaurant: "Pizza Palace",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
      { name: "Garlic Bread", quantity: 1, price: 4.99 },
      { name: "Soda", quantity: 2, price: 1.99 },
    ],
    status: "Delivered",
    total: 23.96,
  },
  {
    id: "order-1002",
    date: "May 10, 2023",
    restaurant: "Burger Barn",
    items: [
      { name: "Cheeseburger", quantity: 2, price: 8.99 },
      { name: "French Fries", quantity: 1, price: 3.99 },
      { name: "Milkshake", quantity: 1, price: 4.99 },
    ],
    status: "Delivered",
    total: 26.96,
  },
  {
    id: "order-1003",
    date: "May 5, 2023",
    restaurant: "Sushi Supreme",
    items: [
      { name: "California Roll", quantity: 1, price: 12.99 },
      { name: "Miso Soup", quantity: 2, price: 3.5 },
      { name: "Green Tea", quantity: 1, price: 2.99 },
    ],
    status: "Delivered",
    total: 22.98,
  },
  {
    id: "order-1004",
    date: "April 28, 2023",
    restaurant: "Taco Time",
    items: [
      { name: "Taco Combo", quantity: 1, price: 15.99 },
      { name: "Guacamole", quantity: 1, price: 3.99 },
      { name: "Horchata", quantity: 1, price: 2.99 },
    ],
    status: "Delivered",
    total: 22.97,
  },
  {
    id: "order-1005",
    date: "April 20, 2023",
    restaurant: "Pasta Place",
    items: [
      { name: "Spaghetti Carbonara", quantity: 1, price: 16.99 },
      { name: "Garlic Bread", quantity: 1, price: 4.99 },
      { name: "Tiramisu", quantity: 1, price: 6.99 },
    ],
    status: "Delivered",
    total: 28.97,
  },
]


const totalOrders = mockOrders.length
const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)
const recentOrders = mockOrders.slice(0, 3) // Get 3 most recent orders




const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  gender: z.string(),
})


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState("")
  const [activeTab, setActiveTab] = useState("profile")




  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: mockUser.fullName,
      email: mockUser.email,
      phoneNumber: mockUser.phoneNumber,
      address: mockUser.address,
      gender: mockUser.gender,
    },
  })


  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }




  const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log("Profile updated:", values)
   
    setIsEditing(false)
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4 mb-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow">
                        <AvatarImage src={avatarPreview || mockUser.avatarUrl || undefined} />
                        <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                          {mockUser.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <div className="absolute bottom-0 right-0">
                          <label htmlFor="avatar-upload" className="cursor-pointer">
                            <div className="rounded-full bg-green-600 p-2 text-white shadow-sm">
                              <Upload className="h-4 w-4" />
                            </div>
                            <input
                              id="avatar-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-lg">{mockUser.fullName}</h3>
                      <p className="text-sm text-gray-500">{mockUser.email}</p>
                      <p className="text-xs text-gray-400 mt-1">Member since {mockUser.joinedDate}</p>
                    </div>
                  </div>


                  <Separator className="my-4" />


                
                  <div className="space-y-4">
                    <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Order Summary</h3>


                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <Package className="h-6 w-6 text-green-600 mb-2" />
                        <p className="text-2xl font-bold text-green-700">{totalOrders}</p>
                        <p className="text-xs text-gray-500">Total Orders</p>
                      </div>


                      <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <Wallet className="h-6 w-6 text-green-600 mb-2" />
                        <p className="text-2xl font-bold text-green-700">₦{totalSpent}</p>
                        <p className="text-xs text-gray-500">Total Spent</p>
                      </div>
                    </div>


                    <div className="mt-4">
                      <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                        View Order History
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>


          
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {activeTab === "profile" ? "Profile Information" : "Order History"}
                    </h2>


                    {activeTab === "profile" && (
                      <div>
                        {isEditing ? (
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={profileForm.handleSubmit(onProfileSubmit)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </Button>
                        )}
                      </div>
                    )}
                  </div>


                  <div className="mt-3 border-b">
                    <div className="flex space-x-6">
                      <button
                        onClick={() => setActiveTab("profile")}
                        className={`pb-2 text-sm font-medium ${
                          activeTab === "profile"
                            ? "border-b-2 border-green-600 text-green-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Profile Information
                      </button>
                      <button
                        onClick={() => setActiveTab("orders")}
                        className={`pb-2 text-sm font-medium ${
                          activeTab === "orders"
                            ? "border-b-2 border-green-600 text-green-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Order History
                      </button>
                    </div>
                  </div>
                </CardHeader>


                <CardContent className="p-6">
                  {activeTab === "profile" && (
                    <div>
                      <Form {...profileForm}>
                        <form className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={profileForm.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} disabled={!isEditing} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} disabled={!isEditing} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1 (555) 123-4567" {...field} disabled={!isEditing} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={profileForm.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gender</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!isEditing}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select your gender" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="male">Male</SelectItem>
                                      <SelectItem value="female">Female</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={profileForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St, City, Country" {...field} disabled={!isEditing} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>


                  
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                        <div className="border rounded-lg p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-10 w-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                              <span className="font-medium">Visa</span>
                            </div>
                            <div>
                              <p className="font-medium">•••• 4242</p>
                              <p className="text-sm text-gray-500">Expires 04/25</p>
                            </div>
                          </div>
                          <Badge>Default</Badge>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Add Payment Method
                          </Button>
                        </div>
                      </div>


                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Delivery Addresses</h3>
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Home</p>
                              <p className="text-sm text-gray-500">{mockUser.address}</p>
                            </div>
                            <Badge>Default</Badge>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            <MapPin className="mr-2 h-4 w-4" />
                            Add Address
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}


                  {activeTab === "orders" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Recent Orders</h3>
                      </div>


                      <div className="space-y-4">
                        {mockOrders.map((order) => (
                          <Card key={order.id} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="bg-gray-50 p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="text-sm text-gray-500">{order.date}</span>
                                </div>
                                <Badge variant={order.status === "Delivered" ? "outline" : "secondary"}>
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h4 className="font-medium">{order.restaurant}</h4>
                                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">₦{order.total.toFixed(2)}</p>
                                  </div>
                                </div>


                                <div className="space-y-2">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                      <span>
                                        {item.quantity}x {item.name}
                                      </span>
                                      <span>₦{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <CardFooter className="flex justify-between border-t p-4">
                                <Button variant="ghost" size="sm">
                                  Reorder
                                </Button>
                                <Button variant="outline" size="sm">
                                  View Details
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



