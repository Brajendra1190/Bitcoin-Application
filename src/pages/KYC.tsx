import React from 'react';
import { Bitcoin } from 'lucide-react';
import { KYCForm } from '../components/kyc/KYCForm';

export function KYC() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Bitcoin className="h-12 w-12 text-yellow-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Complete KYC Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Please provide your details for verification
          </p>
        </div>

        <div className="mt-8 bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-700">
          <KYCForm />
        </div>
      </div>
    </div>
  );
}