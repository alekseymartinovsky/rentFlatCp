import React, { useState } from "react";
import style from "./AdminStartPage.module.css";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router";
import RentFlats, { FLATS_RENDER_TYPE } from "./RentFlats";
import ReservationPage from "../reservationPage/ReservationPage";
import RentalResultPage from "../rentResult/RentalResultPage";

enum ADMIN_MENU {
    RENT = "rent",
    MY = "my",
    SAVE = "save",
    // MESSAGES = "messages",
    RESERVATION = "reservation",
    RESULT = "result",
    INFO = "info",
}

const items: MenuProps["items"] = [
    {
        label: "Все объявления",
        key: ADMIN_MENU.RENT,
    },
    {
        label: "Мои объявления",
        key: ADMIN_MENU.MY,
    },
    {
        label: "Зарезервированные даты",
        key: ADMIN_MENU.RESERVATION,
    },
    {
        label: "Закладки",
        key: ADMIN_MENU.SAVE,
    },
    {
        label: "Инфо",
        key: ADMIN_MENU.INFO,
    },
    // {
    //     label: "Сообщения",
    //     key: ADMIN_MENU.MESSAGES,
    // },
];

const AdminStartPage: React.FC = () => {
    const navigate = useNavigate();

    const [current, setCurrent] = useState<string>(ADMIN_MENU.RENT);

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    return (
        <div className={style.adminStartPage}>
            <Menu className={style.menu} mode="horizontal" items={items} selectedKeys={[current]} onClick={onClick} />
            {current == ADMIN_MENU.RENT ? <RentFlats flatsType={FLATS_RENDER_TYPE.ALL} /> : null}
            {current == ADMIN_MENU.MY ? <RentFlats flatsType={FLATS_RENDER_TYPE.MY} /> : null}
            {current == ADMIN_MENU.SAVE ? <RentFlats flatsType={FLATS_RENDER_TYPE.FAVORITE} /> : null}
            {current == ADMIN_MENU.INFO ? <RentalResultPage></RentalResultPage> : null}
            {current == ADMIN_MENU.RESERVATION ? <ReservationPage /> : null}
        </div>
    );
};

export default AdminStartPage;
