import { RentFlat } from "../model/RentFlat";
import { request } from "./fetchRequests";

const RENT_FLAT_URL = "/rentFlat";

export class FlatServices {
    async getRentFlatsByManager(): Promise<RentFlat[]> {
        return await request.get("/rentFlat/getByManager").then((flats) => {
            const flatsModel: RentFlat[] = [];
            flats.map((flat: any) => {
                flatsModel.push(RentFlat.fromJson(flat));
            });

            return flatsModel;
        });
    }

    async getAllRentFlats(): Promise<RentFlat[]> {
        return await request.get("/rentFlat/getAll").then((flats) => {
            const flatsModel: RentFlat[] = [];
            flats.map((flat: any) => {
                flatsModel.push(RentFlat.fromJson(flat));
            });

            return flatsModel;
        });
    }

    async getFavorite(): Promise<RentFlat[]> {
        return request.get("/rentFlat/getFavorite").then((flats) => {
            const flatsModel: RentFlat[] = [];
            flats.map((flat: any) => {
                flatsModel.push(RentFlat.fromJson(flat));
            });

            return flatsModel;
        });
    }

    async addFlatToFavorite(flat: RentFlat) {
        return request.post(`${RENT_FLAT_URL}/addToFavorite`, flat.toJson());
    }

    async removeFlatFromFavorite(flat: RentFlat) {
        return request.post(`${RENT_FLAT_URL}/removeFromFavorite`, flat.toJson());
    }
}

export const flatService = new FlatServices();
