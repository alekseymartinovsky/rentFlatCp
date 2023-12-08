import { Manager } from "./Manager";
import { RentFlat } from "./RentFlat";
import { User } from "./User";

export class Comment {
    private _id: number;
    private _text: string;
    private _rate: number;
    private _user: Manager;
    private _flat: RentFlat;

    constructor(id: number, text: string, rate: number, user: Manager, flat: RentFlat) {
        this._id = id;
        this._text = text;
        this._rate = rate;
        this._user = user;
        this._flat = flat;
    }

    toJSON() {
        return {
            id: this._id,
            text: this._text,
            rate: this._rate,
            user: { id: this._user.id },
            flat: { id: this._flat.id },
        };
    }

    static fromJson(data: any): Comment {
        return new Comment(data.id, data.text, data.rate, data.user, data.flat);
    }

    /**
     * Getter id
     * @return {number}
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter text
     * @return {string}
     */
    public get text(): string {
        return this._text;
    }

    /**
     * Getter rate
     * @return {number}
     */
    public get rate(): number {
        return this._rate;
    }

    /**
     * Getter user
     * @return {Manager}
     */
    public get user(): Manager {
        return this._user;
    }

    /**
     * Getter flat
     * @return {RentFlat}
     */
    public get flat(): RentFlat {
        return this._flat;
    }

    /**
     * Setter id
     * @param {number} value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter text
     * @param {string} value
     */
    public set text(value: string) {
        this._text = value;
    }

    /**
     * Setter rate
     * @param {number} value
     */
    public set rate(value: number) {
        this._rate = value;
    }

    /**
     * Setter user
     * @param {Manager} value
     */
    public set user(value: Manager) {
        this._user = value;
    }

    /**
     * Setter flat
     * @param {RentFlat} value
     */
    public set flat(value: RentFlat) {
        this._flat = value;
    }
}
