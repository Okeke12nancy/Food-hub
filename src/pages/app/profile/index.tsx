"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Edit, Save, X, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const mockCustomerUser = {
  id: "user-123",
  type: "customer",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  gender: "male",
  avatarUrl: "",
  joinedDate: "January 2023",
}

const mockVendorUser = {
  id: "vendor-456",
  type: "vendor",
  ownerName: "Jane Smith",
  email: "jane.smith@restaurant.com",
  phoneNumber: "+1 (555) 987-6543",
  avatarUrl: "",
  restaurantName: "Delicious Bites",
  restaurantType: "casual-dining",
  restaurantAddress: "456 Food St, Chicago, IL 60601",
  restaurantDescription: "Serving the best homemade meals in town since 2010.",
  openingHours: "Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM",
  joinedDate: "March 2022",
}

// Form schemas
const customerProfileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  gender: z.string(),
})

const vendorProfileSchema = z.object({
  ownerName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  restaurantName: z.string().min(2, { message: "Restaurant name must be at least 2 characters" }),
  restaurantType: z.string(),
  restaurantAddress: z.string().min(5, { message: "Address must be at least 5 characters" }),
  restaurantDescription: z.string().min(10, { message: "Description must be at least 10 characters" }),
  openingHours: z.string().min(5, { message: "Please provide valid opening hours" }),
})

export default function ProfilePage() {
  
  const [userType, setUserType] = useState<"customer" | "vendor">("customer")
  const [isEditing, setIsEditing] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState("")

  
  const userData = userType === "customer" ? mockCustomerUser : mockVendorUser

 
  const profileForm = useForm<z.infer<typeof customerProfileSchema> | z.infer<typeof vendorProfileSchema>>({
    resolver: zodResolver(userType === "customer" ? customerProfileSchema : vendorProfileSchema),
    defaultValues:
      userType === "customer"
        ? {
            fullName: mockCustomerUser.fullName,
            email: mockCustomerUser.email,
            phoneNumber: mockCustomerUser.phoneNumber,
            address: mockCustomerUser.address,
            gender: mockCustomerUser.gender,
          }
        : {
            ownerName: mockVendorUser.ownerName,
            email: mockVendorUser.email,
            phoneNumber: mockVendorUser.phoneNumber,
            restaurantName: mockVendorUser.restaurantName,
            restaurantType: mockVendorUser.restaurantType,
            restaurantAddress: mockVendorUser.restaurantAddress,
            restaurantDescription: mockVendorUser.restaurantDescription,
            openingHours: mockVendorUser.openingHours,
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

 
  const onProfileSubmit = (values: any) => {
    console.log("Profile updated:", values)
    
    setIsEditing(false)
  }

  
  const toggleUserType = () => {
    setUserType(userType === "customer" ? "vendor" : "customer")
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and update your personal information</CardDescription>
            </div>
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
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4 mb-8">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow">
                  <AvatarImage src={avatarPreview || userData.avatarUrl || undefined} />
                  <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                    {userType === "customer"
                      ? mockCustomerUser.fullName.charAt(0)
                      : mockVendorUser.restaurantName.charAt(0)}
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
                <h3 className="font-medium text-lg">
                  {userType === "customer" ? mockCustomerUser.fullName : mockVendorUser.restaurantName}
                </h3>
                <p className="text-sm text-gray-500">
                  {userType === "customer" ? mockCustomerUser.email : mockVendorUser.email}
                </p>
                <Badge variant="outline" className="mt-2">
                  {userType === "customer" ? "Customer" : "Restaurant Owner"}
                </Badge>
              </div>
            </div>

            <Form {...profileForm}>
              <form className="space-y-6">
                {userType === "customer" ? (
                  <>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
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
                  </>
                ) : (
                  <>
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Owner Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="ownerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Owner Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Smith" {...field} disabled={!isEditing} />
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
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Restaurant Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="restaurantName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Restaurant Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Delicious Bites" {...field} disabled={!isEditing} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="restaurantType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Restaurant Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select restaurant type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fast-food">Fast Food</SelectItem>
                                  <SelectItem value="casual-dining">Casual Dining</SelectItem>
                                  <SelectItem value="fine-dining">Fine Dining</SelectItem>
                                  <SelectItem value="cafe">Café</SelectItem>
                                  <SelectItem value="bakery">Bakery</SelectItem>
                                  <SelectItem value="pizzeria">Pizzeria</SelectItem>
                                  <SelectItem value="ethnic">Ethnic</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="restaurantAddress"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Restaurant Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St, City, Country" {...field} disabled={!isEditing} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="openingHours"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Opening Hours</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM"
                                  {...field}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="restaurantDescription"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Restaurant Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your restaurant, cuisine, specialties, etc."
                                  className="resize-none min-h-[100px]"
                                  {...field}
                                  disabled={!isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </>
                )}
              </form>
            </Form>

            {/* Account Information */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Account Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-medium">Member Since:</span> {userData.joinedDate}
                </p>
              </div>
            </div>

            {/* For demo purposes only - toggle between user types */}
            <div className="mt-6 text-center">
              <Button variant="outline" className="text-sm" onClick={toggleUserType}>
                Switch to {userType === "customer" ? "Vendor" : "Customer"} View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
