import { Spin } from "antd";
import style from "./Loading.module.css";
import { ReactNode } from "react";

const Loading = (props: { load: boolean; children?: ReactNode }) => {
    return (
        <>
            {props.load ? (
                <div className={style.loadingBlock}>
                    <Spin size="large" className={style.spiner} />
                </div>
            ) : (
                props.children
            )}
        </>
    );
};

export default Loading;
