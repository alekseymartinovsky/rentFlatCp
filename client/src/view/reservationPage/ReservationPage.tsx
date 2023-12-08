import { useEffect, useState } from "react";
import "./ReservationPage.css";
import { ApartmentReservation } from "../../model/ApartmentReservations";
import { ReservationService } from "../../service/ReservationService";
import { Spin } from "antd";
import ReservationBlock from "./ReservationBlock";

const ReservationPage = () => {
    const [apartmentReservations, setApartmentsReservations] = useState<ApartmentReservation[]>([]);
    const [loading, setLoading] = useState(true);

    const reservationService = new ReservationService();

    useEffect(() => {
        reservationService.getAllUserReservation().then((res) => {
            setApartmentsReservations([...res]);
            console.log("load");
            setLoading(false);
        });
    }, []);

    return (
        <div className="reservationPage">
            {loading ? (
                <Spin size="large" />
            ) : (
                <div>
                    {apartmentReservations.map((apart) => (
                        <ReservationBlock key={"apart" + apart.flat.id} apartmentReservations={apart} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReservationPage;
