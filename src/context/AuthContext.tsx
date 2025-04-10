
// This file re-exports the auth context components from their new location
// This maintains backward compatibility with existing imports
import { useAuth } from './auth/AuthProvider';
import { AuthProvider } from './auth/AuthProvider';
import { UserRole } from './types/auth-types';

export { useAuth, AuthProvider, UserRole };
