import { Button, DatePicker } from "antd";
import "../ViewRentFlat.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { ReservationService } from "../../service/ReservationService";
import { Reservation } from "../../model/Reservation";

interface ReservationBlockProps {
    flatId: number;
    landlordId: number;
}

type DateRange = {
    startDate: Date;
    endDate: Date;
};

const ReservationBlock = ({ flatId, landlordId }: ReservationBlockProps) => {
    const { RangePicker } = DatePicker;
    const { currentUser } = useContext(UserContext);
    const reservationSrevice = new ReservationService();
    const [reservationsDate, setReservationsDate] = useState<DateRange[]>([]);

    const [rangeDate, setRangeDate] = useState<string[]>([]);

    useEffect(() => {
        reservationSrevice.getReservation(flatId).then((data: Reservation[]) => {
            const reservs: DateRange[] = [];
            data.map((reservation) => {
                reservs.push({
                    startDate: new Date(reservation.startDate),
                    endDate: new Date(reservation.endDate),
                });
            });
            setReservationsDate([...reservs]);
        });
    }, []);

    const confirm = () => {
        if (rangeDate.length === 2) {
            const reservation = new Reservation("", flatId, currentUser.id, landlordId, rangeDate[0], rangeDate[1]);
            reservationSrevice.add(reservation);
        }
    };

    const changeRangeDate = (date: any, dateString: string[]) => {
        setRangeDate(dateString);
    };

    const getDisableDates = (date: any) => {
        if (date < Date.now()) {
            return true;
        }

        const isInAnyRange = reservationsDate.some((range) => {
            return date >= range.startDate && date <= range.endDate;
        });

        return isInAnyRange;
    };

    return (
        <div>
            <h3>Выберите даты для бронирования:</h3>
            <RangePicker
                open
                dropdownClassName="customDateRange"
                onChange={changeRangeDate}
                disabledDate={getDisableDates}
            />
            <Button onClick={confirm} style={{ marginTop: "315px" }} disabled={!(rangeDate.length === 2)}>
                Оставить заявку
            </Button>
        </div>
    );
};

export default ReservationBlock;
