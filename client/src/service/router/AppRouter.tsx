import { FC } from "react";
import { Routes } from "react-router";
import { Route } from "react-router";
import LoginPage from "../../view/registration/LoginPage";
import Sign from "../../view/registration/Sign";
import { StartPage } from "../../view/StartPage";
import AddFlatPage from "../../view/adminPage/AddFlatPage";
import ViewRentFlat from "../../view/ViewRentFlat";
import CreateRentFlat from "../../view/adminPage/CreateRentFlat";

export enum ROUTE_PATH {
    LOGIN = "/login",
    REGISTRATION = "/reg",
    START = "/",
    CALCULATE_FLAT_GRADE = "/calculateFlatGrade",
    RESULT_GRADE = "/resultGrade",
    FALT_INFO = "/flatInfo",
    REPORT = "/reports",
    ADD_FLAT = "/addFlat",
    USER_FLATS = "/userFlats",
    ADMIN_PAGE = "/adminPage",
    EDIT_SETTINGS = "/editSettings",
    UPDATE_PERSONAL_FLAT = "/updatePersonalFlat",
    EDIT_RENT_FLAT = "/editFlatInfo",
    VIEW_RENT_FLAT = "/viewRentFlat",
    EDIT_SALE_FLAT = "/editSaleFlat",
    VIEW_SALE_FLAT = "/viewSaleFlat",
}

/**
 * Реализует навигацию приложения
 *
 * @returns роуты приложения
 */
const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE_PATH.REGISTRATION} element={<Sign />} />
            <Route path={ROUTE_PATH.START} element={<StartPage />} />
            <Route path={ROUTE_PATH.ADD_FLAT} element={<AddFlatPage />} />
            <Route path={ROUTE_PATH.EDIT_RENT_FLAT} element={<CreateRentFlat />} />
            <Route path={ROUTE_PATH.VIEW_RENT_FLAT} element={<ViewRentFlat />} />
        </Routes>
    );
};

export default AppRouter;
