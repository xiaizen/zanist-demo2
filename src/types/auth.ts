export interface User {
  id: string;
  email: string;
  name: string;
  role: 'visitor' | 'member' | 'moderator' | 'admin';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  permissions?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthError {
  message: string;
  code: string;
}

export interface AccessLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
}