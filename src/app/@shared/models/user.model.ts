export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  caiSection: string;
  tosConsent: boolean;
  updatePassword: boolean;
  canManageOpenings: boolean;
  canManageUsers: boolean;
  isVerified: boolean;
}

export interface UserRegistration {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  caiSection: string;
  password: string;
}
