import { AmenitiesName } from "./AmenitiesInfo";
import { FlatInfo } from "./FlatInfo";
import { Manager } from "./Manager";

export class RentFlat {
    private _id: number;
    private _flatInfo: FlatInfo;
    private _images: string[];
    private _amenities: AmenitiesName[];
    private _manager: Manager;
    private _avgRate: number;

    constructor(
        id: number,
        flatInfo: FlatInfo,
        images: string[],
        amentities: AmenitiesName[],
        manager: Manager,
        avgRate: number
    ) {
        this._id = id;
        this._flatInfo = flatInfo;
        this._images = images;
        this._amenities = amentities;
        this._manager = manager;
        this._avgRate = avgRate;
    }

    get avgRate(): number {
        return this._avgRate;
    }

    set avgRate(avgRate: number) {
        this._avgRate = avgRate;
    }

    // Геттеры и сеттеры
    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get flatInfo(): FlatInfo {
        return this._flatInfo;
    }

    set flatInfo(flatInfo: FlatInfo) {
        this._flatInfo = flatInfo;
    }

    get images(): string[] {
        return this._images;
    }

    set images(images: string[]) {
        this._images = images;
    }

    public get amenities(): AmenitiesName[] {
        return this._amenities;
    }
    public set amenities(value: AmenitiesName[]) {
        this._amenities = value;
    }

    public get manager(): Manager {
        return this._manager;
    }
    public set manager(value: Manager) {
        this._manager = value;
    }

    // Метод преобразования в JSON
    toJson() {
        return {
            id: this._id,
            flatInfo: this._flatInfo.toJson(),
            images: this._images,
            amenities: this._amenities,
            manager: this._manager.toJson(),
            avgRate: this._avgRate,
        };
    }

    // Метод создания из JSON
    static fromJson(json: any): RentFlat {
        return new RentFlat(
            json?.id,
            FlatInfo.fromJson(json?.flatInfo),
            json.images,
            json.amenities,
            Manager.deserialize(json.manager),
            json.avgRate
        );
    }

    static fromValues(values: any): RentFlat {
        return new RentFlat(values?.id, FlatInfo.fromFormValues(values), [], values?.amenities, new Manager(), -1);
    }
}
