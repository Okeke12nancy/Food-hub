import { useState } from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Nancy',
    lastName: 'Okeke',
    businessName: "Nancy's Kitchen",
    email: 'nancy@nancykitchen.com',
    phone: '(816) 123-4567',
    bio: "Nancy's Kitchen specializes in homemade, organic meals made with locally-sourced ingredients. We've been serving the community since 2015."
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'profile'
                ? 'text-green-500 border-b-2 border-green-500 bg-green-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${
              activeTab === 'store'
                ? 'text-green-500 border-b-2 border-green-500 bg-green-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('store')}
          >
            Store Information
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 mr-4">
                  <div className="relative">
                    <img
                      src="/api/placeholder/80/80"
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col space-y-2">
                        <button className="bg-green-500 text-white text-xs rounded px-3 py-1">
                          Upload New
                        </button>
                        <button className="bg-red-100 text-red-600 text-xs rounded px-3 py-1">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-medium">Profile Information</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={profileData.businessName}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'store' && (
            <div>
              <h2 className="text-lg font-medium mb-4">Store Information</h2>
              <p className="text-gray-500">Store information settings will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;