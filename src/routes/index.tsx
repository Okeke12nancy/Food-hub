import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Login from '@/pages/auth/login';
import Home from '@/pages/app/home';
import PageSuspense from '@/components/custom/page-suspense';
import Cart from '@/pages/app/cart';
import Checkout from '@/pages/app/checkout';
import Search from '@/pages/app/search';
import Vendor from '@/pages/app/vendor';
import VendorDetails from '@/pages/app/vendor/details';
import Header from '@/components/partials/header';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
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
]);

export default router;
