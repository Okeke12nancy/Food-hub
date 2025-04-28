import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Login from '@/pages/auth/login';
import Home from '@/pages/app/home';
import Cart from '@/pages/app/cart';
import Profile from '@/pages/app/profile';
import Orders from '@/pages/app/orders';
import OrderDetails from '@/pages/app/orders/details';
import Vendor from '@/pages/app/vendor';
import VendorDetails from '@/pages/app/vendor/details';
import Header from '@/components/partials/header';
import VendorAdmin from '@/Vendor/VendorApp/VendorAdmin';
import Dashboard from '@/Vendor/PagesVendor/Dashboard';
import Products from '@/Vendor/PagesVendor/Products';
import VendorOrders from '@/Vendor/PagesVendor/Orders';
import Payments from '@/Vendor/PagesVendor/Payments';
import Settings from '@/Vendor/PagesVendor/Settings';
import PageSuspense from '@/components/custom/page-suspense';
import Checkout from '@/pages/app/checkout';
import Search from '@/pages/app/search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
 
  {
    path: 'user',
    element: (
      <div>
        <Header />
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageSuspense />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<PageSuspense />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<PageSuspense />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<PageSuspense />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: 'vendor',
        element: (
          <Suspense fallback={<PageSuspense />}>
            <Vendor />
          </Suspense>
        ),
      },
      {
        path: 'vendor/:id',
        element: (
          <Suspense fallback={<PageSuspense />}>
            <VendorDetails />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: 'vendor-admin',
    element: <VendorAdmin />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'orders',
        element: <VendorOrders />,
      },
      {
        path: 'payments',
        element: <Payments />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  }
]);

export default router;
