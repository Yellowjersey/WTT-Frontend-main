import { Form, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SettingService from "../../../services/setting"
import ToastMe from "../Common/ToastMe";
import PageLoader from "../Common/PageLoader";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const PromoCode = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [promo, setPromo] = useState()

    const getPromocode =async () => {
        dispatch(SettingService.getPromoCode())
            .then((res) => {
                setLoading(false);
                 if (res.data != null) {
                  setPromo(res?.data)
                }
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    const handleSwitchChange = (data) => {
        dispatch(SettingService.updatePromoCode(data))
            .then((res) => {
                setLoading(false);
                if (res.data != null) {
                    setPromo(res?.data)
                    ToastMe("PromoCode status change successfully", 'success')
                }
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    useEffect(() => {
        getPromocode();
    }, [])

    return (
        <>
            <PageLoader loading={loading} />
            <Col xl="12">
                <Card className='table_custom'>
                    <Card.Header className=" border-0 pb-0">
                        <Card.Title style={{ fontWeight: 700 }}>PROMOCODE</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <span style={{ display: "flex", alignItems: "center" }}>
                            <h1>PromoCode : </h1>
                            <h3 style={{ marginRight: "10px" }}>{promo?.promo_code} </h3>
                            {console.log(promo?.status)}
                            {console.log(promo?.status === true ? true : false,"1234")}
                            <Switch
                                checked={promo?.status === true ? true : false} onChange={() => handleSwitchChange(promo)} />
                        </span>
                    </Card.Body>

                </Card>
            </Col>
        </>
    )
}

export default PromoCode