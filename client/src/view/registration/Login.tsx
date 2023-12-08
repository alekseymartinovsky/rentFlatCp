import { Form, Input, Switch } from "antd";
import Button from "antd/es/button";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormList, { formItem } from "../../component/FormList";
import { request } from "../../service/fetchRequests";
import { ROUTE_PATH } from "../../service/router/AppRouter";
import { tokenService } from "../../service/TokenService";
import { UserContext } from "../../App";
import { User } from "../../model/User";
import { Manager } from "../../model/Manager";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [showError, setShowError] = useState(false);
    const { setManager } = useContext(UserContext);

    const field: formItem[] = [
        {
            name: "login",
            label: "Введите логин",
            element: <Input />,
            value: "",
            rules: [{ required: true, message: "Введите логин" }],
        },
        {
            name: "password",
            label: "Введите пароль",
            element: <Input type="password" />,
            value: "",
            rules: [{ required: true, message: "Введите пароль" }],
        },
        {
            name: "manager",
            label: "Менеджер",
            element: <Switch />,
            value: false,
        },
    ];

    const onFinish = (values: any) => {
        const path = values.manager ? "/manager/login" : "/client/login";
        request.post(path, values).then((data: any) => {
            if (data) {
                tokenService.saveToken(data.token);
                localStorage.setItem("role", values.manager ? "MANAGER" : "CLIENT");
                if (values.manager) {
                    const manager = Manager.deserialize(data.manager);
                    tokenService.saveUserInfo(manager);
                    setManager(manager);
                }
                navigate(ROUTE_PATH.START);
            } else {
                setShowError(true);
            }
        });
    };

    return (
        <Form onFinish={onFinish}>
            <FormList data={field} />
            <Button type="primary" htmlType="submit">
                Войти
            </Button>
            {showError ? <div>Логин или пароль введены неверно</div> : null}
        </Form>
    );
};

export default Login;
