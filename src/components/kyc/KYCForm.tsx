import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { submitKYC } from '../../services/kyc';
import { useAuth } from '../../hooks/useAuth';

const KYCSchema = z.object({
  phoneNumber: z.string().regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Invalid Indian phone number'),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number'),
  aadharNumber: z.string().regex(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/, 'Invalid Aadhaar number'),
});

type KYCFormData = z.infer<typeof KYCSchema>;

export function KYCForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<KYCFormData>({
    resolver: zodResolver(KYCSchema)
  });

  const onSubmit = async (data: KYCFormData) => {
    if (!user) return;

    try {
      await submitKYC(user.uid, data);
      toast.success('KYC submitted successfully! Please wait for verification.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit KYC');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">Phone Number</label>
        <input
          {...register('phoneNumber')}
          type="tel"
          placeholder="+91"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">PAN Number</label>
        <input
          {...register('panNumber')}
          type="text"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
        {errors.panNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.panNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Aadhaar Number</label>
        <input
          {...register('aadharNumber')}
          type="text"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        />
        {errors.aadharNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.aadharNumber.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit KYC
      </button>
    </form>
  );
}