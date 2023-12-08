import { useContext, useEffect, useState } from "react";
import { flatService } from "../../service/FlatServices";
import FlatCard from "../../component/FlatCard";
import { RentFlat } from "../../model/RentFlat";
import style from "./Flats.module.css";

export enum FLATS_RENDER_TYPE {
    MY,
    FAVORITE,
    ALL,
}

const RentFlats: React.FC<{ flatsType: FLATS_RENDER_TYPE }> = ({ flatsType }) => {
    const [flats, setFlats] = useState<RentFlat[]>([]);
    const [favoriteRentFlats, setFavoriteRentFlats] = useState<RentFlat[]>([]);

    useEffect(() => {
        if (flatsType == FLATS_RENDER_TYPE.MY) {
            flatService.getRentFlatsByManager().then((flats) => setFlats(flats));
        }
        if (flatsType == FLATS_RENDER_TYPE.ALL) {
            flatService.getAllRentFlats().then((flats) => setFlats(flats));
            flatService.getFavorite().then((flats) => setFavoriteRentFlats(flats));
        }
        if (flatsType == FLATS_RENDER_TYPE.FAVORITE) {
            flatService.getFavorite().then((flats) => setFlats(flats));
        }
    }, []);

    return (
        <div className={style.container}>
            {flats.map((flat: RentFlat) => {
                let isFavorite = favoriteRentFlats.find((favoriteFlat) => favoriteFlat.id === flat.id) ? true : false;
                if (flatsType == FLATS_RENDER_TYPE.FAVORITE) {
                    isFavorite = true;
                }
                return (
                    <div className={style.item}>
                        <FlatCard
                            flat={flat}
                            isFavorite={isFavorite}
                            isManagerCard={flatsType === FLATS_RENDER_TYPE.MY}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default RentFlats;
