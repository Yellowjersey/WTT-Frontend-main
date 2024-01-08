import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Empty, DatePicker, Form, Input, Modal, Table } from "antd";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import ToastMe from "../Common/ToastMe";
import { SearchOutlined } from "@ant-design/icons";
import SettingService from "../../../services/setting";
import moment from "moment";
import dayjs from 'dayjs';
import Swal from "sweetalert2";


const RifleSeason = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serach, setSerach] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [visible, setVisible] = useState(false);
    const [Id, setId] = useState("");
    const [form] = Form.useForm();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    console.log(startDate);
    console.log(endDate);

    const filteredData = useMemo(() => {
        if (selectedFilter === null) return data;
        return data.filter((item) => {
            if (selectedFilter === 0) {
                return item.status === 0;
            } else if (selectedFilter === 1) {
                return item.status === 1;
            } else if (selectedFilter === 2) {
                return item.status === 2;
            } else if (selectedFilter === 3) {
                return item.status === 3;
            } else if (selectedFilter === 4) {
                return item.status === 4;
            }
            return true;
        });
    }, [data, selectedFilter]);

    const getRifleSeasons = () => {
        dispatch(SettingService.getRifleSeasons(serach)).then((res) => {
            var newArr = [];
            for (var i = 0; i < res?.data.length; i++) {
                newArr.push({
                    key: i,
                    id: res?.data[i]._id,
                    date: res?.data[i].date,
                    to_date: res?.data[i].to_date,
                    from_date: res?.data[i].from_date,
                    status: res?.data[i].status,
                    createdAt: res?.data[i].createdAt,
                });
            }
            setData(newArr);
            setLoading(false);
        })
            .catch((errors) => {
                console.log({ errors })
                setLoading(false)
            })
    };

    useEffect(() => {
        getRifleSeasons();
    }, [serach]);

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
                dispatch(SettingService.deleterifleseason(text))
                    .then((res) => {
                        getRifleSeasons();
                        ToastMe(res?.data?.message, 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    }

    const handleDateChange = (dates, dateStrings) => {
        if (!moment(dateStrings[0]).isSame(startDate) || !moment(dateStrings[1]).isSame(endDate)) {
            setStartDate(moment(dateStrings[0], "YYYY-MM-DD"));
            setEndDate(moment(dateStrings[1], "YYYY-MM-DD"));
        }
    };

    const columnss = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
            render: (text) => <div>{text + 1}</div>,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: 'Actions',
            key: 'actions',
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

    const handleSearch = (e) => {
        setSerach(e.target.value)
    }
    const handleSubmit = (values) => {
        // values.from_date = moment(startDate)
        // values.to_date = endDate
        values.id = Id;

        const apicall =
            Id === ""
                ? SettingService.addRifle(values) : SettingService.updateRifle(values);
        dispatch(apicall)
            .then((res) => {
                getRifleSeasons();
                ToastMe(res?.data?.message, 'success')
                setVisible(false)
                setId('')
                form.resetFields()
            })
            .catch((errors) => {
                console.log(errors)
            })
    };

    const editModal = (e) => {
        console.log(e);
        setId("")
        form.resetFields();
        setStartDate(null);
        setEndDate(null);
        if (e) {
            setId(e.id);
            form.setFieldsValue({
                from_date: [
                    e.from_date ? dayjs(e.from_date) : null,
                    e.to_date ? dayjs(e.to_date) : null,
                ],
            });
            //     setStartDate(e?.from_date ? moment(e.from_date, "YYYY-MM-DD") : null);
            //     setEndDate(e?.to_date ? moment(e.to_date, "YYYY-MM-DD") : null);
        } else {
            setId("")
            form.resetFields();
            setStartDate(null);
            setEndDate(null);
        }
        setVisible(true);
    }
    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Rifle Season List</h4>
                    <div className="d-flex gap-2">
                        <div className="search_feild">
                            <Input placeholder='Search....' onChange={(e) => handleSearch(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
                        </div>
                        <Button type="primary" onClick={() => editModal()}>
                            Add
                        </Button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {filteredData && filteredData.length > 0 ? (
                            <Table
                                dataSource={filteredData}
                                columns={columnss}
                                className="table_custom"
                            />
                        ) : (
                            <Empty />
                        )}
                    </div>
                </div>
            </div>
            <Modal
                open={visible}
                title={Id ? "Edit Rifle Season" : "Add Rifle Season"}
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
                        <label className="label-name">Date</label>
                        <Form.Item
                            name="from_date"
                        >
                            <DatePicker.RangePicker
                                // defaultValue={[
                                //     startDate ? dayjs(startDate) : null,
                                //     endDate ? dayjs(endDate) : null
                                // ]}
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
            </Modal>
        </>
    );
};

export default RifleSeason;
