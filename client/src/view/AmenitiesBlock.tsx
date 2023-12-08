import { Amenities, AmenitiesName } from "../model/AmenitiesInfo";
import style from "./Amenities.module.css";

const AmenitiesBlock: React.FC<{ amenities: AmenitiesName[] }> = ({ amenities }) => {
    console.log(amenities);
    return (
        <div className={style.amenities}>
            {amenities.map((name) => {
                const info = Amenities.getInfoByValue(name);
                if (info) {
                    return (
                        <div className={style.item}>
                            <img width="30px" height="30px" src={"/img/" + info.icon + ".png"} alt="" />
                            <div>{info.label}</div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default AmenitiesBlock;
