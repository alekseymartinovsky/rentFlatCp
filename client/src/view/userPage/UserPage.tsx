import { useState } from "react";
import { Menu, MenuProps } from "antd";

enum USER_MENU {
    RENT = "rent",
    SALE = "sale",
    FAVORITE = "favorite",
}

const UserPage: React.FC = () => {
    const [current, setCurrent] = useState("rent");

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    return <div></div>;
};

export default UserPage;
