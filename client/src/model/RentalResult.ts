import { RentFlat } from "./RentFlat";
import { ResultPriceIncomeEntry } from "./ResultPriceIncomeEntry";

export type MonthData = {
    flat: RentFlat;
    monthPrices: ResultPriceIncomeEntry[];
};

export class RentalResult {
    private _monthData: MonthData[];
    private _totalPrice: number;

    constructor(monthData: MonthData[], totalPrice: number) {
        this._totalPrice = totalPrice;
        this._monthData = monthData;
    }

    static fromJson(data: any) {
        const monthData = data.monthData.map((d: any): MonthData => {
            const flat = RentFlat.fromJson(d.first);
            const monthPrices = d.second.map((rentResult: any) => ResultPriceIncomeEntry.fromJson(rentResult));

            return { flat: flat, monthPrices: monthPrices };
        });

        return new RentalResult(monthData, data.totalPrice);
    }

    /**
     * Getter monthData
     * @return {MonthData[]}
     */
    public get monthData(): MonthData[] {
        return this._monthData;
    }

    /**
     * Getter totalPrice
     * @return {number}
     */
    public get totalPrice(): number {
        return this._totalPrice;
    }

    /**
     * Setter monthData
     * @param {MonthData[]} value
     */
    public set monthData(value: MonthData[]) {
        this._monthData = value;
    }

    /**
     * Setter totalPrice
     * @param {number} value
     */
    public set totalPrice(value: number) {
        this._totalPrice = value;
    }
}
