import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Empty, Form, Input, Modal, Table } from "antd";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import ToastMe from "../Common/ToastMe";
import { SearchOutlined } from "@ant-design/icons";
import SettingService from "../../../services/setting";

const RifleSeason = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serach, setSerach] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [visible, setVisible] = useState(false);
    const [Id, setId] = useState("");
    const [form] = Form.useForm();

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
                    </div>
                </>
            ),
        },
    ];

    const handleSearch = (e) => {
        setSerach(e.target.value)
    }
    const handleSubmit = (values) => {
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
            })
            .catch((errors) => {
                console.log(errors)
            })
    };

    const editModal = (e) => {
        setId("")
        setVisible(true);
        if (e) {
            setId(e?.id)
            form.setFieldsValue({
                date: e.date,
            });
        } else {
            form.resetFields();
        }
    }

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">State List</h4>
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
                title={Id ? "Edit Rifle Season":"Add Rifle Season"}
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
                            name="date"
                            rules={[
                                { required: true, message: "Please Enter Date" },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Date.."
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
