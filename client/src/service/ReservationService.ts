import { ApartmentReservation } from "../model/ApartmentReservations";
import { RentFlat } from "../model/RentFlat";
import { Reservation } from "../model/Reservation";
import { request } from "./fetchRequests";

const RESERVATION_URL = "/reservation";

export class ReservationService {
    async getReservation(flatId: number): Promise<Reservation[]> {
        return request
            .get(`${RESERVATION_URL}/getByFlatId`, { id: flatId })
            .then((data: []) => data.map((d) => Reservation.fromJson(d)));
    }

    async add(reservation: Reservation): Promise<Reservation> {
        return request.post(RESERVATION_URL, reservation.toJson()).then((data) => Reservation.fromJson(data));
    }

    async getAllUserReservation(): Promise<ApartmentReservation[]> {
        return request
            .post(`${RESERVATION_URL}/getApartmentReservations`, {})
            .then((data) => data.map((apart: any) => ApartmentReservation.fromJson(apart)));
    }
}
