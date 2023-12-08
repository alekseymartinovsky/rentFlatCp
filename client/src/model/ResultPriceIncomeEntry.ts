export class ResultPriceIncomeEntry {
    private _date: string;
    private _resPrice: number;

    constructor(date: string, resPrice: number) {
        this._date = date;
        this._resPrice = resPrice;
    }

    static fromJson(data: any) {
        return new ResultPriceIncomeEntry(data.date, data.resPrice);
    }

    /**
     * Getter date
     * @return {string}
     */
    public get date(): string {
        return this._date;
    }

    /**
     * Getter resPrice
     * @return {number}
     */
    public get resPrice(): number {
        return this._resPrice;
    }

    /**
     * Setter date
     * @param {string} value
     */
    public set date(value: string) {
        this._date = value;
    }

    /**
     * Setter resPrice
     * @param {number} value
     */
    public set resPrice(value: number) {
        this._resPrice = value;
    }
}
