export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  tosConsent: boolean;
  isCaiArosio: boolean;
  updatePassword: boolean;
  canManageOpenings: boolean;
  canManageUsers: boolean;
  isVerified: boolean;
}
