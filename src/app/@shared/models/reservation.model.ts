import { Opening } from './opening.model';

export interface Reservation {
  id: number;
  openingId: number;
  userId: number;
  reservePartner: boolean;
}

export interface ReservationAction {
  opening: Opening;
  userId: number;
}
