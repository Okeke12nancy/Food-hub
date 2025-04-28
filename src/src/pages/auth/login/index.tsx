"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight, ChevronLeft } from "lucide-react"
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const customerFormSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
    address: z.string().min(5, { message: "Address must be at least 5 characters" }),
    gender: z.string({ required_error: "Please select a gender" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const vendorFormSchema = z
  .object({
    ownerName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
    restaurantName: z.string().min(2, { message: "Restaurant name must be at least 2 characters" }),
    restaurantType: z.string({ required_error: "Please select a restaurant type" }),
    restaurantAddress: z.string().min(5, { message: "Address must be at least 5 characters" }),
    restaurantDescription: z.string().min(10, { message: "Description must be at least 10 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegistrationView = "options" | "customer" | "vendor"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [registrationView, setRegistrationView] = useState<RegistrationView>("options")
  const navigate = useNavigate()

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const customerForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  })

  const vendorForm = useForm<z.infer<typeof vendorFormSchema>>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      ownerName: "",
      email: "",
      phoneNumber: "",
      restaurantName: "",
      restaurantType: "",
      restaurantAddress: "",
      restaurantDescription: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log("Login form submitted:", values)
    
    // Mock login logic - replace with actual API call
    if (values.email.includes('vendor')) {
      // If vendor login
      navigate('/vendor-admin');
    } else {
      // If regular user login
      navigate('/user');
    }
  }

  function onCustomerSubmit(values: z.infer<typeof customerFormSchema>) {
    console.log("Customer registration form submitted:", values)
    // After successful registration, navigate to user dashboard
    navigate('/user');
  }

  function onVendorSubmit(values: z.infer<typeof vendorFormSchema>) {
    console.log("Vendor registration form submitted:", values)
    // After successful registration, navigate to vendor admin
    navigate('/vendor-admin');
  }

  // Reset registration view when switching tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "register") {
      setRegistrationView("options")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and info */}
        <div className="hidden md:flex flex-col space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Delicious food, delivered to your door</h1>
            <p className="text-lg text-gray-600">
              Order from your favorite restaurants and track your delivery in real-time.
            </p>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-xl">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Food delivery illustration"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-1">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Order from thousands of restaurants</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-1">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Fast delivery to your doorstep</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-1">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Track your order in real-time</p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div>
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full" onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-500" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-500" />
                                  )}
                                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="text-sm text-right">
                        <Link href="/forgot-password" className="text-green-600 hover:text-green-500">
                          Forgot your password?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        Sign in
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="register">
                  {registrationView === "options" && (
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-medium">Choose your account type</h3>
                        <p className="text-sm text-gray-500">Select how you want to use our platform</p>
                      </div>

                      <div className="grid gap-4">
                        <div
                          onClick={() => setRegistrationView("customer")}
                          className="relative group overflow-hidden rounded-lg border p-4 hover:border-green-500 transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3">
                              <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">I want to order food</h3>
                              <p className="text-sm text-gray-500">Register as a customer to order from restaurants</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-all duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>

                        <div
                          onClick={() => setRegistrationView("vendor")}
                          className="relative group overflow-hidden rounded-lg border p-4 hover:border-green-500 transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-green-100 p-3">
                              <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">I'm a restaurant owner</h3>
                              <p className="text-sm text-gray-500">Register as a vendor to sell your food</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 transition-all duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {registrationView === "customer" && (
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="p-0 mr-2"
                          onClick={() => setRegistrationView("options")}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="ml-1">Back</span>
                        </Button>
                        <h3 className="text-lg font-medium">Customer Registration</h3>
                      </div>

                      <Form {...customerForm}>
                        <form onSubmit={customerForm.handleSubmit(onCustomerSubmit)} className="space-y-4">
                          <FormField
                            control={customerForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St, City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                          <FormField
                            control={customerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type={showPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                      ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                      )}
                                      <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customerForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type={showConfirmPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                      {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                      ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                      )}
                                      <span className="sr-only">
                                        {showConfirmPassword ? "Hide password" : "Show password"}
                                      </span>
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                            Create Account
                          </Button>
                        </form>
                      </Form>
                    </div>
                  )}

                  {registrationView === "vendor" && (
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="p-0 mr-2"
                          onClick={() => setRegistrationView("options")}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="ml-1">Back</span>
                        </Button>
                        <h3 className="text-lg font-medium">Restaurant Owner Registration</h3>
                      </div>

                      <Form {...vendorForm}>
                        <form onSubmit={vendorForm.handleSubmit(onVendorSubmit)} className="space-y-4">
                          <div className="space-y-4">
                            <h4 className="font-medium text-sm text-gray-500">Owner Information</h4>
                            <FormField
                              control={vendorForm.control}
                              name="ownerName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={vendorForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={vendorForm.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1 (555) 123-4567" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <Separator className="my-4" />

                          <div className="space-y-4">
                            <h4 className="font-medium text-sm text-gray-500">Restaurant Information</h4>
                            <FormField
                              control={vendorForm.control}
                              name="restaurantName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Restaurant Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Delicious Bites" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={vendorForm.control}
                              name="restaurantType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Restaurant Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                              control={vendorForm.control}
                              name="restaurantAddress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Restaurant Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123 Main St, City, Country" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={vendorForm.control}
                              name="restaurantDescription"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Restaurant Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Tell us about your restaurant, cuisine, specialties, etc."
                                      className="resize-none min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <Separator className="my-4" />

                          <div className="space-y-4">
                            <h4 className="font-medium text-sm text-gray-500">Account Security</h4>
                            <FormField
                              control={vendorForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...field}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                      >
                                        {showPassword ? (
                                          <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                          <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                        <span className="sr-only">
                                          {showPassword ? "Hide password" : "Show password"}
                                        </span>
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={vendorForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...field}
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      >
                                        {showConfirmPassword ? (
                                          <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                          <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                        <span className="sr-only">
                                          {showConfirmPassword ? "Hide password" : "Show password"}
                                        </span>
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                            Create Restaurant Account
                          </Button>
                        </form>
                      </Form>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button" className="bg-white">
                    <svg
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="google"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                      ></path>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="bg-white">
                    <svg
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="facebook"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                      ></path>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-gray-500">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-gray-900">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-gray-900">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
