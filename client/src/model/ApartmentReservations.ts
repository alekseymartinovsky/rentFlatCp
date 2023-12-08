import { Manager } from "./Manager";
import { RentFlat } from "./RentFlat";
import { Reservation } from "./Reservation";

export type ReservationData = {
    reserv: Reservation;
    tenant: Manager;
};

export class ApartmentReservation {
    private _flat: RentFlat;
    private _reservationsData: ReservationData[];

    constructor(flat: RentFlat, reservations: ReservationData[]) {
        this._flat = flat;
        this._reservationsData = [...reservations];
    }

    static fromJson(data: any): ApartmentReservation {
        const flat = RentFlat.fromJson(data.flat);
        const reservations = data.reservationData.map((d: any) => {
            return {
                reserv: Reservation.fromJson(d.first),
                tenant: Manager.deserialize(d.second),
            };
        });
        return new ApartmentReservation(flat, reservations);
    }

    /**
     * Getter flat
     * @return {RentFlat}
     */
    public get flat(): RentFlat {
        return this._flat;
    }

    /**
     * Getter reservationsData
     * @return {ReservationData[]}
     */
    public get reservationsData(): ReservationData[] {
        return this._reservationsData;
    }

    /**
     * Setter flat
     * @param {RentFlat} value
     */
    public set flat(value: RentFlat) {
        this._flat = value;
    }

    /**
     * Setter reservationsData
     * @param {ReservationData[]} value
     */
    public set reservationsData(value: ReservationData[]) {
        this._reservationsData = value;
    }
}
