import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd';
import moment from 'moment';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import ToastMe from "../Common/ToastMe";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import supportService from '../../../services/support';
import dayjs from 'dayjs';



const LastSesason = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [seasondata, setSeasondata] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [Id, setId] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

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
                            season_name: res.data[i].season_name,
                            season_id: res.data[i].season_id,
                            from_date: res.data[i].from_date,
                            to_date: res.data[i].to_date,
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


    const getSeasons = () => {
        dispatch(supportService.getSeasons())
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
                setSeasondata(newArr);
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
                setLoading(false)
            })
    }
    useEffect(() => {
        getSeasons();
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
            title: 'Season Name',
            dataIndex: 'season_name',
            key: 'season_name',
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
                        {/* <span
                            style={{ margin: "0 10px", fontSize: "16px", color: "#f92b2b", cursor: "pointer" }}
                            onClick={() => activeInactive(data)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </span> */}
                    </div>
                </>
            ),
        },
    ];

    useEffect(() => {
        document.title = 'Admin | Dates '
    }, [])

    const handleSubmit = (values) => {
        values.id = Id;
        const apicall =
            Id === ""
                ? supportService.createlateseason(values) : supportService.updatelateseason(Id, values);
        dispatch(apicall)
            .then((res) => {
                setVisible(false);
                setId('');
                getSeason();
                ToastMe(res?.data?.message, "success");
            })
            .catch((errors) => {
                console.log({ errors });
            });
    };
    // const [initialDateValues, setInitialDateValues] = useState([]);
    const editModal = (e) => {
        setId("")
        form.resetFields();
        setStartDate(null);
        setEndDate(null);
        if (e) {
            setId(e.id);
            form.setFieldsValue({
                name: [
                    e.from_date ? dayjs(e.from_date) : null,
                    e.to_date ? dayjs(e.to_date) : null,
                ],
                season_id: e.season_id
            });
        } else {
            setId("")
            form.resetFields();
            setStartDate(null);
            setEndDate(null);
        }
        setVisible(true);
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
                        ToastMe(res?.data?.message, "success");
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    }

    // const handleDateChange = (dates, dateStrings) => {
    //     console.log('Formatted Date Strings:', dateStrings);
    //     setDate(dateStrings)
    // };

    const handleDateChange = (dates, dateStrings) => {
        if (!moment(dateStrings[0]).isSame(startDate) || !moment(dateStrings[1]).isSame(endDate)) {
            setStartDate(moment(dateStrings[0], "YYYY-MM-DD"));
            setEndDate(moment(dateStrings[1], "YYYY-MM-DD"));
        }
    };
    const { Option } = Select;

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Dates</h4>
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
                title={Id ? "Edit" : "Add"}
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
                        <label className="label-name">Season</label>
                        <Form.Item
                            name="season_id"
                            rules={[{ required: true, message: "Please Select Late Season" }]}
                        >
                            <Select
                                placeholder="Please select Late Season"
                                style={{
                                    width: '100%',
                                }}
                                value={"season"}
                            >
                                {seasondata?.map((season) => (
                                    < Option key={season.id} value={season.id} >
                                        {season.name}
                                    </Option>
                                ))}
                            </Select>

                        </Form.Item>
                        <label className="label-name">Dates</label>
                        <Form.Item
                            name="name"
                        >
                            <DatePicker.RangePicker
                                format="YYYY-MM-DD"
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
            </Modal >
        </>
    )
}

export default LastSesason