import { ApartmentReservation } from "../../model/ApartmentReservations";

interface ReservationBlockProps {
    apartmentReservations: ApartmentReservation;
}

const ReservationBlock = ({ apartmentReservations }: ReservationBlockProps) => {
    function getFormattedDateString(date: Date): string {
        // Получаем компоненты даты
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1; // Добавляем 1, так как месяцы начинаются с 0
        const year: number = date.getFullYear();

        // Добавляем ведущий ноль, если число меньше 10
        const formattedDay: string = day < 10 ? "0" + day : day.toString();
        const formattedMonth: string = month < 10 ? "0" + month : month.toString();

        // Формируем строку "DD-MM-YYYY"
        const formattedDateStr: string = `${formattedDay}-${formattedMonth}-${year}`;

        return formattedDateStr;
    }

    return (
        <div className="reservationBlock">
            <h3>{apartmentReservations.flat.flatInfo.getAddress()}</h3>
            {apartmentReservations.reservationsData.length > 0 ? (
                <div>
                    <div className="reservInfo header">
                        <div>Дата заезда:</div>
                        <div>Дата выезда:</div>
                        <div>Почта арендатора:</div>
                    </div>
                    {apartmentReservations.reservationsData.map((reserv) => {
                        return (
                            <div className="reservInfo" key={"reserev" + reserv.reserv.id}>
                                <div>{getFormattedDateString(reserv.reserv.startDate)}</div>
                                <div>{getFormattedDateString(reserv.reserv.endDate)}</div>
                                <div>
                                    <a href={`mailto:${reserv.tenant.email}`}>{reserv.tenant.email}</a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>На данный момент резервирований нет</div>
            )}
        </div>
    );
};

export default ReservationBlock;
