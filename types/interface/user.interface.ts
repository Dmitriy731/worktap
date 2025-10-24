import type { UserRole } from '~/types/enum/user-role.enum'

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  photo: string;
}