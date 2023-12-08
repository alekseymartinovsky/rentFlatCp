import { Button, Form, Input, Rate } from "antd";
import { Comment } from "../../model/Comment";
import { useEffect, useState } from "react";

interface CreateCommentFormProps {
    confirm: (text: string, rate: number) => void;
    editComment?: Comment;
}

const CreateCommentForm = ({ confirm, editComment }: CreateCommentFormProps) => {
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values: any) => {
        confirm(values.text, values.rate * 2);
    };

    return (
        <div className="createComment">
            <Form onFinish={onFinish}>
                <Form.Item
                    name="text"
                    label="Комментарий"
                    rules={[
                        { required: true, message: "Введите Ваш комментарий" },
                        // { min: 25, message: "Пожалуйста, опишите Ваши впечатления подробнее" },
                        // { max: 500, message: "Пожалуйста, сократите коммнетарий" },
                    ]}
                    initialValue={editComment?.text}
                >
                    <Input.TextArea placeholder="Добавьте свой комментарий" maxLength={500} showCount />
                </Form.Item>
                <Form.Item name="rate" initialValue={(editComment?.rate ?? 0) / 2}>
                    <Rate allowHalf defaultValue={0}></Rate>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Отправить
                    </Button>

                    <Button onClick={onReset}>Сбросить</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateCommentForm;
