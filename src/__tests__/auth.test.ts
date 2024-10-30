import { describe, it, expect, vi } from 'vitest';
import { signUp, signIn } from '../services/auth';
import { auth } from '../config/firebase';

vi.mock('../config/firebase', () => ({
  auth: {
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  },
}));

describe('Authentication', () => {
  it('should create a new user', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    vi.mocked(auth.createUserWithEmailAndPassword).mockResolvedValueOnce({
      user: mockUser,
    } as any);

    const result = await signUp('test@example.com', 'password123', 'Test User');
    expect(result).toEqual(mockUser);
  });

  it('should sign in existing user', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    vi.mocked(auth.signInWithEmailAndPassword).mockResolvedValueOnce({
      user: mockUser,
    } as any);

    const result = await signIn('test@example.com', 'password123');
    expect(result).toEqual(mockUser);
  });
});