import { useLocation } from "react-router-dom";
import Header from "../component/Header";
import FlatInfoBlock from "../component/FlatInfoBlock";
import { RentFlat } from "../model/RentFlat";
import { Button, Calendar, Carousel, DatePicker, Rate } from "antd";
import { URL_API, request } from "../service/fetchRequests";
import style from "./ViewPage.module.css";
import AmenitiesBlock from "./AmenitiesBlock";
import { useEffect, useRef, useState } from "react";
import React from "react";
import CommentBlock from "./Comment/CommentBlock";
import ReservationBlock from "./reservation/ReservationBlock";
import { Placemark, YMaps, Map } from "@pbe/react-yandex-maps";

const ViewRentFlat: React.FC = () => {
    const location = useLocation();
    const [pdfUrl, setPdfUrl] = useState<string>();

    useEffect(() => {
        const getPdf = async () => {
            const blob = new Blob([await request.getPdf("/rentFlat/document", { rentId: rentFlats.id })], {
                type: "application/pdf",
            });
            const urlObject = window.URL.createObjectURL(blob);
            setPdfUrl(urlObject);
        };

        getPdf();
    }, []);

    const rentFlats = RentFlat.fromJson(location.state);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = pdfUrl!;
        link.download = "document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        const newWindow = window.open(
            pdfUrl,
            "_blank",
            "location=yes,height=1920,width=1080,scrollbars=yes,status=yes"
        );
        if (newWindow) {
            newWindow.onload = () => {
                newWindow.print();
            };
        } else {
            throw new Error("Не удалось открыть новое окно для печати");
        }
    };

    return (
        <>
            <Header back />
            <div className={style.viewRentFlat}>
                <Carousel className={style.carousel}>
                    {rentFlats.images.map((imagePath: string) => {
                        return (
                            <div className={style.carouselBlock}>
                                <img className={style.carouselImage} src={URL_API + "/images/" + imagePath} alt="" />;
                            </div>
                        );
                    })}
                </Carousel>
                <div className={style.info}>
                    <div className={style.contactBlock}>
                        <ReservationBlock flatId={rentFlats.id} landlordId={rentFlats.manager.id} />
                        <h4>Контакты</h4>
                        <div className={style.contacts}>
                            <div>
                                Телефон: <a href={`tel: ${rentFlats.manager.phone}`}>{rentFlats.manager.phone}</a>{" "}
                            </div>
                            <div>
                                Почта:{" "}
                                <a href={`mailto:${rentFlats.manager.email}?subject=Аренда квартиры`}>
                                    {rentFlats.manager.email}
                                </a>
                            </div>
                            <div className={style.documentButton}>
                                <Button onClick={handleDownload}>Скачать документ</Button>
                                <Button onClick={handlePrint}>Распечатать документ</Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.infoBlock}>
                        <h3>Цена: {rentFlats.flatInfo.price} BYN / мес.</h3>
                        <h4>
                            {rentFlats.avgRate / 2 >= 0 ? (
                                <div style={{ display: "flex" }}>
                                    <h4 style={{ paddingRight: "20px", lineHeight: "31px" }}>Оценка:</h4>
                                    <Rate value={rentFlats.avgRate / 2} disabled allowHalf />
                                </div>
                            ) : (
                                <h4> На данный момент оценок нет</h4>
                            )}
                        </h4>
                        <FlatInfoBlock flat={rentFlats} />
                        <AmenitiesBlock amenities={rentFlats.amenities} />
                        <div className={style.description}>{rentFlats.flatInfo.description}</div>
                        <YMaps>
                            <div>
                                <Map width="100%" height="500px" defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
                                    <Placemark geometry={[55.684758, 37.738521]} />
                                </Map>
                            </div>
                        </YMaps>
                        <CommentBlock flat={rentFlats} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewRentFlat;
