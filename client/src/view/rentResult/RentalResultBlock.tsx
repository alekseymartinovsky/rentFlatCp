import { Collapse, CollapseProps, Divider } from "antd";
import { MonthData, RentalResult } from "../../model/RentalResult";
import "./RentalResultPage.css";

interface RentalResultPageProps {
    monthData: MonthData;
}

const RentalResultBlock = ({ monthData }: RentalResultPageProps) => {
    const { flat, monthPrices } = monthData;

    const rentalResultTable = monthPrices.map((monthPrice) => {
        return (
            <div className="pricesList">
                <div className="date">{monthPrice.date}</div>
                <div className="price">{monthPrice.resPrice} р.</div>
            </div>
        );
    });

    return (
        <div className="rentalResultBlock">
            <Collapse defaultActiveKey={["1"]}>
                <Collapse.Panel
                    header={flat.flatInfo.getAddress()}
                    key="1"
                    style={{ width: "600px", minHeight: "50px" }}
                >
                    {monthPrices.length > 0 ? (
                        <>
                            <div className="titlePricelist">
                                <div className="date">Дата</div>
                                <div>Заработано (р.)</div>
                            </div>
                            {rentalResultTable}
                        </>
                    ) : (
                        <div>Квартира ещё не сдавалась</div>
                    )}
                </Collapse.Panel>
            </Collapse>
        </div>
    );
};

export default RentalResultBlock;
