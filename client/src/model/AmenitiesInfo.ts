export type AmenitiesInfo = {
    value: string;
    label: string;
    icon: string;
};

export class Amenities {
    static info: AmenitiesInfo[] = [
        { value: "hotWater", label: "Горячая вода", icon: "faucet" },
        { value: "essentials", label: "Основное", icon: "all" },
        { value: "bedLinen", label: "Постельное белье", icon: "blanket" },
        { value: "mosquitoNet", label: "Москитная сетка", icon: "mosquito" },
        { value: "crib", label: "Кроватка", icon: "baby-bed" },
        { value: "heating", label: "Отопление", icon: "heat" },
        { value: "wifi", label: "Wi-Fi", icon: "wifi" },
        { value: "refrigerator", label: "Холодильник", icon: "refrigerator" },
        { value: "electricKettle", label: "Электрочайник", icon: "electric-kettle" },
        { value: "tv", label: "Телевизор", icon: "tv" },
        { value: "cooking", label: "Плита", icon: "electric-stove" },
        { value: "coffeeMaker", label: "Кофеварка", icon: "coffee-machine" },
        { value: "parking", label: "Парковка", icon: "parking-area" },
        { value: "washingMachine", label: "Стиральная машина", icon: "washing-machine" },
        { value: "airConditioning", label: "Кондиционер", icon: "air-conditioner" },
        { value: "fireSafety", label: "Пожарная безопасность", icon: "fire-extinguisher" },
    ];

    static getInfoByValue(name: AmenitiesName) {
        // TODO переделать info чтобы там была не строка а значение AmenitiesName.any
        return this.info.find((info: AmenitiesInfo) => info.value === String(name));
    }
}

export enum AmenitiesName {
    id,
    hotWater,
    essentials,
    bedLinen,
    mosquitoNet,
    crib,
    heating,
    wifi,
    refrigerator,
    electricKettle,
    tv,
    cooking,
    coffeeMaker,
    parking,
    washingMachine,
    airConditioning,
    fireSafety,
}
