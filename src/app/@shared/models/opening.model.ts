import { Reservation } from './reservation.model';

export interface Opening {
  id: number;
  date: string;
  from: string;
  to: string;
  special: string;
  maxReservations: number;
  reservations: Reservation[];
}
