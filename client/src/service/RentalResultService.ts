import { RentalResult } from "../model/RentalResult";
import { request } from "./fetchRequests";

const RENTAL_RESALT_URL = "/rentalResult";

export class RentalResultService {
    getRantalResult() {
        return request.get(RENTAL_RESALT_URL).then((data) => RentalResult.fromJson(data));
    }
}
