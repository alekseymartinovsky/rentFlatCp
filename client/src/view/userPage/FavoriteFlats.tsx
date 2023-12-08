import { useEffect, useState } from "react";
import { RentFlat } from "../../model/RentFlat";
import { request } from "../../service/fetchRequests";
import FlatCard from "../../component/FlatCard";
import style from "../adminPage/Flats.module.css";

const FavoriteFlats: React.FC = () => {
    const [rentFlats, setRentFlats] = useState<RentFlat[]>([]);

    useEffect(() => {
        request.get("/client/favorite").then((res: any) => {
            const rentFlatsModel: RentFlat[] = [];
            res?.favoriteRentFlat.map((flat: any) => {
                rentFlatsModel.push(RentFlat.fromJson(flat));
            });
            setRentFlats(rentFlatsModel);
        });
    }, []);

    return (
        <div className={style.container}>
            {rentFlats.map((flat: RentFlat) => {
                return (
                    <div className={style.item}>
                        <FlatCard isFavorite={true} flat={flat} isManagerCard={false} />
                    </div>
                );
            })}
        </div>
    );
};

export default FavoriteFlats;
