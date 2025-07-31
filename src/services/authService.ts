import { User, LoginCredentials, RegisterCredentials, AccessLog } from '../types/auth';

// Mock user data with different roles
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'System Administrator',
    role: 'admin' as const,
    permissions: ['admin:read', 'admin:write', 'users:manage', 'analytics:view', 'settings:manage']
  },
  {
    id: '2',
    email: 'moderator@example.com',
    name: 'Content Moderator',
    role: 'moderator' as const,
    permissions: ['users:read', 'analytics:view']
  },
  {
    id: '3',
    email: 'member@example.com',
    name: 'Premium Member',
    role: 'member' as const,
    permissions: ['profile:edit']
  },
  {
    id: '4',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'visitor' as const,
    permissions: []
  }
];

const MOCK_PASSWORD = 'password123';

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Log access attempt
    this.logAccess({
      action: 'login_attempt',
      resource: '/auth/login',
      success: false,
      email: credentials.email
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user by email
    const user = MOCK_USERS.find(u => u.email === credentials.email);
    
    if (!user || credentials.password !== MOCK_PASSWORD) {
      this.logAccess({
        action: 'login_failed',
        resource: '/auth/login',
        success: false,
        email: credentials.email
      });
      throw new Error('Geçersiz email veya şifre');
    }

    // Generate JWT-like token
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Store tokens
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    // Log successful login
    this.logAccess({
      action: 'login_success',
      resource: '/auth/login',
      success: true,
      userId: user.id
    });

    return { user, token };
  }

  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    // Log registration attempt
    this.logAccess({
      action: 'register_attempt',
      resource: '/auth/register',
      success: false,
      email: credentials.email
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === credentials.email);
    if (existingUser) {
      this.logAccess({
        action: 'register_failed',
        resource: '/auth/register',
        success: false,
        email: credentials.email
      });
      throw new Error('Bu email adresi ile kayıtlı kullanıcı bulunmaktadır');
    }

    // Create new user with visitor role by default
    const newUser: User = {
      id: `${Date.now()}`,
      email: credentials.email,
      name: credentials.name,
      role: 'visitor',
      createdAt: new Date().toISOString(),
      permissions: []
    };

    // Add to mock users
    MOCK_USERS.push(newUser);

    const token = this.generateToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);

    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(newUser));

    this.logAccess({
      action: 'register_success',
      resource: '/auth/register',
      success: true,
      userId: newUser.id
    });

    return { user: newUser, token };
  }

  async logout(): Promise<void> {
    const user = this.getCurrentUserSync();
    
    if (user) {
      this.logAccess({
        action: 'logout',
        resource: '/auth/logout',
        success: true,
        userId: user.id
      });
    }

    await new Promise(resolve => setTimeout(resolve, 300));

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  async validateToken(token: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
      // Decode mock JWT token
      const payload = this.decodeToken(token);
      const user = MOCK_USERS.find(u => u.id === payload.userId);
      
      if (!user || payload.exp < Date.now()) {
        throw new Error('Token expired or invalid');
      }

      return user;
    } catch (error) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      throw new Error('Invalid token');
    }
  }

  async refreshToken(): Promise<{ user: User; token: string }> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const payload = this.decodeToken(refreshToken);
      const user = MOCK_USERS.find(u => u.id === payload.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      const newToken = this.generateToken(user);
      localStorage.setItem(this.TOKEN_KEY, newToken);

      return { user, token: newToken };
    } catch (error) {
      this.logout();
      throw new Error('Failed to refresh token');
    }
  }

  getCurrentUserSync(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      return payload.exp > Date.now();
    } catch {
      return false;
    }
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUserSync();
    if (!user) return false;

    // Admin has all permissions
    if (user.role === 'admin') return true;

    return user.permissions?.includes(permission) || false;
  }

  hasRole(role: string | string[]): boolean {
    const user = this.getCurrentUserSync();
    if (!user) return false;

    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  }

  canAccessAdmin(): boolean {
    return this.hasRole(['admin', 'moderator']);
  }

  private generateToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      iat: Date.now(),
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = btoa(`mock_signature_${user.id}`);
    
    return `${header}.${payload}.${signature}`;
  }

  private generateRefreshToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      userId: user.id,
      type: 'refresh',
      iat: Date.now(),
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    }));
    const signature = btoa(`mock_refresh_signature_${user.id}`);
    
    return `${header}.${payload}.${signature}`;
  }

  private decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    try {
      return JSON.parse(atob(parts[1]));
    } catch {
      throw new Error('Invalid token payload');
    }
  }

  private logAccess(log: Partial<AccessLog> & { action: string; resource: string; success: boolean }): void {
    const accessLog: AccessLog = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: log.userId,
      action: log.action,
      resource: log.resource,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1', // Mock IP
      userAgent: navigator.userAgent,
      success: log.success
    };

    // Store in localStorage for demo (in production, send to backend)
    const logs = JSON.parse(localStorage.getItem('access_logs') || '[]');
    logs.push(accessLog);
    
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    
    localStorage.setItem('access_logs', JSON.stringify(logs));
    
    console.log('Access Log:', accessLog);
  }

  getAccessLogs(): AccessLog[] {
    return JSON.parse(localStorage.getItem('access_logs') || '[]');
  }
}

export const authService = new AuthService();