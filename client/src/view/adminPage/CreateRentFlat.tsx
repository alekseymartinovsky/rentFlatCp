import { Button, Checkbox, Form, Input, InputNumber, Switch, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { URL_API, request } from "../../service/fetchRequests";
import { useLocation, useNavigate } from "react-router";
import { ROUTE_PATH } from "../../service/router/AppRouter";
import style from "./AdminStartPage.module.css";
import "./CreateRentFlat.css";
import { RentFlat } from "../../model/RentFlat";
import { Header } from "antd/es/layout/layout";
import { Amenities, AmenitiesInfo } from "../../model/AmenitiesInfo";

const CreateRentFlat: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isEdit = location.state?.isEdit ? true : false;

    const IconCheckBox = ({ amenityInfo }: { amenityInfo: AmenitiesInfo }) => {
        const [value, setValue] = useState(false);

        const onChange = () => {
            setValue(!value);
        };

        return (
            <div className={`iconCheckbox ${value ? "greenBorder" : ""}`} onClick={onChange}>
                <Checkbox checked={value} value={value} />
                <img src={`/img/${amenityInfo.icon}.png`} alt="" />
                <span className="iconCheckboxTitle">{amenityInfo.label}</span>
            </div>
        );
    };

    const fieldData = [
        { name: "city", label: "Город", required: true, component: <Input /> },
        { name: "street", label: "Улица", required: true, component: <Input /> },
        { name: "house", label: "Дом", required: true, component: <Input /> },
        { name: "flat", label: "Квартира", component: <Input /> },
        { name: "price", label: "Цена", required: true, component: <InputNumber /> },
        { name: "square", label: "Площадь", required: true, component: <InputNumber /> },
        { name: "balcony", label: "Балкон", component: <Checkbox /> },
        { name: "repair", label: "Ремонт", required: true, component: <Input /> },
        { name: "rooms", label: "Количество комнат", required: true, component: <InputNumber /> },
        { name: "floor", label: "Этаж", required: true, component: <InputNumber /> },
        { name: "description", label: "Описание", component: <TextArea rows={4} /> },
    ];

    const amenitiesData = [
        ...Amenities.info.map((am) => {
            return {
                name: am.value,
                component: <IconCheckBox amenityInfo={am} />,
                label: null,
                required: false,
            };
        }),
    ];

    const onFinish = (values: any) => {
        console.log(values);
        const rentFlat: RentFlat = RentFlat.fromValues(values);

        if (isEdit) {
            rentFlat.id = location.state.id;
            request.put("/rentFlat/update", rentFlat.toJson()).then(() => {
                navigate(ROUTE_PATH.START);
            });
        } else {
            request.post("/rentFlat/add", rentFlat.toJson()).then(() => {
                navigate(ROUTE_PATH.START);
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Form errors:", errorInfo);
    };

    const initialValues = (): any => {
        if (isEdit) {
            return {
                city: location.state?.flatInfo.city,
                street: location.state?.flatInfo.street,
                house: location.state?.flatInfo.house,
                flat: location.state?.flatInfo.flat,
                price: location.state?.flatInfo.price,
                square: location.state?.flatInfo.square,
                balcony: location.state?.flatInfo.balcony,
                repair: location.state?.flatInfo.repair,
                rooms: location.state?.flatInfo.rooms,
                floor: location.state?.flatInfo.floor,
                description: location.state?.flatInfo.description,
                hotWater: location.state?.amenities.hotWater,
                essentials: location.state?.amenities.essentials,
                bedLinen: location.state?.amenities.bedLinen,
                mosquitoNet: location.state?.amenities.mosquitoNet,
                crib: location.state?.amenities.crib,
                heating: location.state?.amenities.heating,
                wifi: location.state?.amenities.wifi,
                refrigerator: location.state?.amenities.refrigerator,
                electricKettle: location.state?.amenities.electricKettle,
                tv: location.state?.amenities.tv,
                cooking: location.state?.amenities.cooking,
                coffeeMaker: location.state?.amenities.coffeeMaker,
                parking: location.state?.amenities.parking,
                washingMachine: location.state?.amenities.washingMachine,
                airConditioning: location.state?.amenities.airConditioning,
                fireSafety: location.state?.amenities.fireSafety,
            };
        }
    };

    return (
        <>
            <Header />
            <div className={style.createForm}>
                <Form
                    name="createFlat"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    className={style.createFlat}
                    initialValues={initialValues()}
                >
                    {fieldData.map(({ name, label, required, component }) => (
                        <Form.Item
                            key={name}
                            label={label}
                            name={name}
                            rules={[{ required: required, message: "Заполните обязательное поле" }]}
                        >
                            {component}
                        </Form.Item>
                    ))}
                    <Form.Item name="amenities">
                        <Checkbox.Group
                            options={amenitiesData.map((amenity) => {
                                return {
                                    label: amenity.component,
                                    value: amenity.name,
                                };
                            })}
                            className="amenitiesBlock"
                        />
                    </Form.Item>
                    <Form.Item label="Image">
                        <Upload
                            onChange={(info) => {
                                console.log(info.fileList);
                            }}
                            accept="image/jpeg"
                            customRequest={request.uploadImage}
                        >
                            <Button>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Создать объявление
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreateRentFlat;
