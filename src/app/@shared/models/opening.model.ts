import { Reservation } from './reservation.model';

export interface Opening {
  id: number;
  date: Date;
  from: string;
  to: string;
  special: string;
  reservations: Reservation[];
}
