import { describe, it, expect, vi } from 'vitest';
import { submitKYC, getKYCStatus } from '../services/kyc';
import { db } from '../config/firebase';

vi.mock('../config/firebase', () => ({
  db: {
    doc: vi.fn(),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
  },
}));

describe('KYC Service', () => {
  it('should submit KYC data', async () => {
    const mockKYCData = {
      phoneNumber: '+919876543210',
      panNumber: 'ABCDE1234F',
      aadharNumber: '123456789012',
    };

    await submitKYC('user123', mockKYCData);
    expect(db.setDoc).toHaveBeenCalled();
  });

  it('should get KYC status', async () => {
    vi.mocked(db.getDoc).mockResolvedValueOnce({
      data: () => ({ kycVerified: true }),
    } as any);

    const status = await getKYCStatus('user123');
    expect(status).toBe(true);
  });
});