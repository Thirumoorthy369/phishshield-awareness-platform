
import { UserRole } from '../types/auth-types';

// Mock users for demo
export const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password123',
    role: UserRole.USER
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: UserRole.ADMIN
  },
  {
    id: '3',
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'super123',
    role: UserRole.SUPER_ADMIN
  }
];
