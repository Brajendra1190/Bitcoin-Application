import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Shield, Key } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Name</label>
            <div className="mt-1 text-lg">{user?.displayName}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <div className="mt-1 text-lg">{user?.email}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Settings
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Enable 2FA
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-gray-400">Update your password regularly for better security</p>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              Change
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Access
        </h2>
        
        <div className="space-y-4">
          <p className="text-gray-400">Generate API keys to access your account programmatically</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate New API Key
          </button>
        </div>
      </div>
    </div>
  );
}