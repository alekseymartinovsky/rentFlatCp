import React, { useState } from "react";
import { ROUTE_PATH } from "../service/router/AppRouter";
import { Card, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import { URL_API, request } from "../service/fetchRequests";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, StarOutlined } from "@ant-design/icons";
import { RentFlat } from "../model/RentFlat";
import { useNavigate } from "react-router";
import style from "./FlatCard.module.css";
import { flatService } from "../service/FlatServices";

const FlatCard: React.FC<{
    flat: RentFlat;
    edit?: boolean;
    initVisible?: boolean;
    isManagerCard?: boolean;
    isFavorite: boolean;
}> = ({ flat, edit = false, initVisible = true, isManagerCard = false, isFavorite }) => {
    const [visible, setVisible] = useState(initVisible);
    const navigate = useNavigate();
    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

    const handleEdit = () => {
        navigate(flat instanceof RentFlat ? ROUTE_PATH.EDIT_RENT_FLAT : ROUTE_PATH.EDIT_SALE_FLAT, {
            state: { ...flat.toJson(), isEdit: true },
        });
    };

    const click = () => {
        navigate(flat instanceof RentFlat ? ROUTE_PATH.VIEW_RENT_FLAT : ROUTE_PATH.VIEW_SALE_FLAT, {
            state: flat.toJson(),
        });
    };

    const handleDelete = () => {
        const path = flat instanceof RentFlat ? "/rentFlat/delete" : "/saleFlat/delete";
        setVisible(false);
        request.delete(path, { id: flat.id }).then((res: any) => {
            console.log(res);
        });
    };

    const handleFavorite = () => {
        if (!isFavoriteState) {
            setIsFavoriteState(true);
            flatService.addFlatToFavorite(flat as RentFlat);
        } else {
            setIsFavoriteState(false);
            flatService.removeFlatFromFavorite(flat as RentFlat);
        }
    };

    return visible ? (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src={URL_API + "/images/" + flat.images[0]}
                    onClick={click}
                    width={"300px"}
                    height={"200px"}
                />
            }
            actions={
                isManagerCard
                    ? [
                          <EditOutlined rev key="edit" onClick={handleEdit} />,
                          <DeleteOutlined rev key="remove" onClick={handleDelete} />,
                      ]
                    : [
                          <StarOutlined
                              rev
                              onClick={handleFavorite}
                              twoToneColor="#FFBF00"
                              style={{
                                  width: "24px",
                                  height: "24px",
                                  fontSize: "24px",
                                  color: isFavoriteState ? "#FFBF00" : "gray",
                              }}
                              width="16px"
                              height="16px"
                          />,
                      ]
            }
            className={style.flatCard}
        >
            <div onClick={click}>
                <div>
                    {(flat as RentFlat).avgRate >= 0 && (flat as RentFlat).avgRate ? (
                        <Rate value={(flat as RentFlat).avgRate / 2} disabled allowHalf />
                    ) : (
                        <i style={{ lineHeight: "31px" }}>У данной квартиры ещё нет оценок</i>
                    )}
                </div>
                <span>Цена: {flat.flatInfo.price} руб.</span>
                <Meta
                    title={flat.flatInfo.rooms + " комн. / " + flat.flatInfo.square + " мм^2"}
                    description={flat.flatInfo.getAddress()}
                />
            </div>
        </Card>
    ) : null;
};

export default FlatCard;
