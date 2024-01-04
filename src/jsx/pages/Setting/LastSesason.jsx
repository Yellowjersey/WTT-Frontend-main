import React, { useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, DatePicker, Form, Input, Modal, Table } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";
import moment from 'moment';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import ToastMe from "../Common/ToastMe";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import TextArea from 'antd/es/input/TextArea';
import { fromUnixTime } from 'date-fns';
import Swal from 'sweetalert2';
import supportService from '../../../services/support';



const LastSesason = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [visiblemail, setVisiblemail] = useState(false);
    const [Id, setId] = useState("");
    const [date, setDate] = useState("");
    const { RangePicker } = DatePicker;

    const getSeason = () => {
        dispatch(supportService.getSeason())
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            id: res.data[i]._id,
                            name: res.data[i].name,
                        }
                    )
                }
                setData(newArr);
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
                setLoading(false)
            })
    }
    useEffect(() => {
        getSeason();
    }, [])

    const columnss = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            render: (text) => (
                <div>
                    {text + 1}
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, data) => (
                <>
                    <div>
                        <span
                            style={{ margin: "0 10px", fontSize: "16px", color: "#1677ff", cursor: "pointer" }}
                            onClick={() => editModal(data)}>
                            <i className="fa fa-edit" aria-hidden="true"></i>
                        </span>
                        <span
                            style={{ margin: "0 10px", fontSize: "16px", color: "#f92b2b", cursor: "pointer" }}
                            onClick={() => activeInactive(data)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </span>
                    </div>
                </>
            ),
        },
    ];

    const handleSubmit = (values) => {
        console.log("values", values);
        return false
        console.log(date);
        const newdata = date[0] + " " + "To" + " " + date[1]
        console.log(newdata);
        values.name = newdata
        // return false;
        // values.question = values.question.trim();
        const apicall =
            Id === ""
                ? supportService.createlateseason(values) : supportService.updatelateseason(Id, values);
        dispatch(apicall)
            .then((res) => {
                setVisible(false);
                setVisiblemail(false);
                setId('');
                getSeason();
                ToastMe(res.data.message, "success");
            })
            .catch((errors) => {
                console.log({ errors });
            });
    };
    // const [initialDateValues, setInitialDateValues] = useState([]);
    const editModal = (e) => {
        // const dateArray = e?.name?.split(" To ");
        // console.log({ dateArray });
        // const startDate = moment(dateArray?.[0], 'DD/MM/YYYY').format('YYYY-MM-DD');
        // console.log({ startDate });
        // const endDate = moment(dateArray?.[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
        // console.log(44, startDate, endDate);
        // const initialDateValue = [moment(startDate), moment(endDate)];
        // // const initialDateValue = [moment('2023-01-01'), moment('2023-01-10')];

        // setInitialDateValues(initialDateValue)
        // return false
        const dateRange = e?.name?.split(' To ').map(dateString => moment(dateString, 'DD/MM/YYYY'));
        console.log(e);
        setId("")
        setVisible(true);
        if (e) {
            setId(e?.id)
            form.setFieldsValue({
                name: dateRange
            });
        } else {
            form.resetFields();
        }
    }

    const activeInactive = (text) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "To Delete it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(supportService.deletelateseason(text))
                    .then((res) => {
                        getSeason();
                        ToastMe("Status Change Successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    }

    const handleDateChange = (dates, dateStrings) => {
        console.log('Formatted Date Strings:', dateStrings);
        setDate(dateStrings)
    };

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Late season</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add
                    </Button>
                </div>

                <div className="card-body">
                    <Table columns={columnss} className='table_custom' dataSource={data} />
                </div>
            </div>
            <Modal
                open={visible}
                title={Id ? "Edit lastseason" : "Add lastseason"}
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => {
                    setVisible(false);
                }}
                footer={
                    [
                    ]
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <div>
                        <label className="label-name">Title</label>
                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: "Please selected date" },

                            ]}
                        >
                            <RangePicker
                                // showTime={{ format: 'HH:mm' }}
                                // defaultValue={initialDateValues && initialDateValues}
                                format="DD/MM/YYYY"
                                onChange={handleDateChange}
                            />
                        </Form.Item>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <Button key="cancel" onClick={() => setVisible(false)}>
                            {" "}
                            Cancel{" "}
                        </Button>
                        <Button
                            style={{ marginLeft: "7px" }}
                            htmlType="submit"
                            type="primary"
                            key="submit"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default LastSesason