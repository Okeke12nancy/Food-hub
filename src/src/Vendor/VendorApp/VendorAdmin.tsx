import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/sidebar';
import Navbar from '../Components/navbar';
import './Vendor.css';

function VendorAdmin() {
  const [activePage, setActivePage] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default VendorAdmin;
