export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  tosConsent: boolean;
  isAdmin: boolean;
  updatePassword: boolean;
}
