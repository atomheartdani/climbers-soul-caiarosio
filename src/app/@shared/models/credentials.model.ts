export interface Credentials {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  updatePassword: boolean;
  canManageOpenings: boolean;
  canManageUsers: boolean;
  token: string;
}
