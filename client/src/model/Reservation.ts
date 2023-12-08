export class Reservation {
    private _id: string;
    private _flatId: number;
    private _tenantId: number;
    private _landlordId: number;
    private _startDate: Date;
    private _endDate: Date;

    constructor(id: string, flatId: number, tenantId: number, landlordId: number, startDate: string, endDate: string) {
        this._id = id;
        this._flatId = flatId;
        this._tenantId = tenantId;
        this._landlordId = landlordId;
        this._startDate = new Date(startDate);
        this._endDate = new Date(endDate);
    }

    static fromJson(data: any) {
        return new Reservation(data.id, data.flatId, data.tenantId, data.landlordId, data.startDate, data.endDate);
    }

    toJson() {
        return {
            id: this._id,
            flatId: this._flatId,
            tenantId: this._tenantId,
            landlordId: this._landlordId,
            startDate: this._startDate.toISOString(),
            endDate: this._endDate.toISOString(),
        };
    }

    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Getter flatId
     * @return {number}
     */
    public get flatId(): number {
        return this._flatId;
    }

    /**
     * Getter tenantId
     * @return {number}
     */
    public get tenantId(): number {
        return this._tenantId;
    }

    /**
     * Getter landlordId
     * @return {number}
     */
    public get landlordId(): number {
        return this._landlordId;
    }

    /**
     * Getter startDate
     * @return {string}
     */
    public get startDate(): Date {
        return this._startDate;
    }

    /**
     * Getter endDate
     * @return {string}
     */
    public get endDate(): Date {
        return this._endDate;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Setter flatId
     * @param {number} value
     */
    public set flatId(value: number) {
        this._flatId = value;
    }

    /**
     * Setter tenantId
     * @param {number} value
     */
    public set tenantId(value: number) {
        this._tenantId = value;
    }

    /**
     * Setter landlordId
     * @param {number} value
     */
    public set landlordId(value: number) {
        this._landlordId = value;
    }

    /**
     * Setter startDate
     * @param {string} value
     */
    public set startDate(value: Date) {
        this._startDate = value;
    }

    /**
     * Setter endDate
     * @param {string} value
     */
    public set endDate(value: Date) {
        this._endDate = value;
    }
}
