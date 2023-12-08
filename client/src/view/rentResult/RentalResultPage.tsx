import { useEffect, useState } from "react";
import "./RentalResultPage.css";
import { RentalResultService } from "../../service/RentalResultService";
import { RentalResult } from "../../model/RentalResult";
import RentalResultBlock from "./RentalResultBlock";
import { Spin } from "antd";

const RentalResultPage = () => {
    const [rentalResults, setRentalResults] = useState<RentalResult>();

    const rentalResultService = new RentalResultService();

    useEffect(() => {
        rentalResultService.getRantalResult().then((data: RentalResult) => {
            console.log(data);
            setRentalResults(data);
        });
    }, []);

    return (
        <div className="rentalResultPage">
            <div>
                <h2>Всего до вычета налогов заработано: {rentalResults?.totalPrice}р.</h2>
            </div>
            {rentalResults?.monthData.length ? (
                <div>
                    {rentalResults?.monthData.map((data) => (
                        <RentalResultBlock monthData={data} />
                    ))}
                </div>
            ) : (
                <Spin size="large" />
            )}
        </div>
    );
};

export default RentalResultPage;
