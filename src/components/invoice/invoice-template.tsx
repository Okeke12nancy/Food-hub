import React from 'react';
import { format } from 'date-fns';
import { Package2 } from 'lucide-react';

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceProps {
  invoiceNumber: string;
  orderDate: Date;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  vendorName: string;
  vendorAddress: string;
}

export const InvoiceTemplate = React.forwardRef<HTMLDivElement, InvoiceProps>(
  (
    {
      invoiceNumber,
      orderDate,
      customerName,
      customerEmail,
      customerAddress,
      items,
      subtotal,
      tax,
      total,
      paymentMethod,
      vendorName,
      vendorAddress,
    },
    ref
  ) => {
    return (
      <div ref={ref} className="bg-white p-8 shadow-lg max-w-3xl mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Package2 className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Chow Hub</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Food Delivery Service</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">INVOICE</h2>
            <p className="text-sm text-gray-500">#{invoiceNumber}</p>
            <p className="text-sm text-gray-500 mt-1">
              Date: {format(orderDate, 'MMMM dd, yyyy')}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-gray-500 font-medium mb-2">Bill To:</h3>
            <p className="font-medium">{customerName}</p>
            <p className="text-sm text-gray-500">{customerEmail}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">
              {customerAddress}
            </p>
          </div>
          <div>
            <h3 className="text-gray-500 font-medium mb-2">Vendor:</h3>
            <p className="font-medium">{vendorName}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">
              {vendorAddress}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 text-left font-medium text-gray-500">
                  Item
                </th>
                <th className="py-2 text-right font-medium text-gray-500">
                  Qty
                </th>
                <th className="py-2 text-right font-medium text-gray-500">
                  Price
                </th>
                <th className="py-2 text-right font-medium text-gray-500">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-4">{item.name}</td>
                  <td className="py-4 text-right">{item.quantity}</td>
                  <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-4 text-right">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 font-medium mb-2">
                Payment Method:
              </h3>
              <p>{paymentMethod}</p>
            </div>
            <div className="text-right">
              <h3 className="text-gray-500 font-medium mb-2">
                Payment Status:
              </h3>
              <p className="text-green-600 font-medium">PAID</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for your order!</p>
          <p className="mt-1">
            This invoice serves as proof of payment. Please show it to the
            vendor upon delivery.
          </p>
        </div>
      </div>
    );
  }
);

InvoiceTemplate.displayName = 'InvoiceTemplate';
