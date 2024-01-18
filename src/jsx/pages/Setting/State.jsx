import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Empty, Form, Input, Modal, Select, Space, Table } from "antd";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import ToastMe from "../Common/ToastMe";
import { SearchOutlined } from "@ant-design/icons";
import SettingService from "../../../services/setting";

const State = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [serach, setSerach] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [visible, setVisible] = useState(false);
    const [rifledata, setRifleData] = useState([]);
    const [lateseasons, setlateSeasonData] = useState([]);
    const [Id, setId] = useState("");
    const [rifleId, setRifleID] = useState("");
    const [seasonId, setlateSeasonID] = useState("");
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

    const getStates = () => {
        
        dispatch(SettingService.getStates(serach)).then((res) => {
            var newArr = [];
            for (var i = 0; i < res?.data.length; i++) {
                newArr.push({
                    key: i,
                    id: res?.data[i]._id,
                    name: res?.data[i].name,
                    archry_oct: res?.data[i].archry_oct,
                    muzzele_loader: res?.data[i].muzzele_loader,
                    rifle: res?.data[i].rifle,
                    late_season: res?.data[i].late_season,
                    bear: res?.data[i].bear,
                    turkey: res?.data[i].turkey,
                    state_website: res?.data[i].state_website,
                    check_in_game_link: res?.data[i].check_in_game_link,
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

    const getRifleSeasons = () => {
        dispatch(SettingService.getRifleSeasons()).then((res) => {
            const newArr = [];
            for (let i = 0; i < res.data.length; i++) {
                newArr.push({
                    label: res.data[i].date,
                    value: res.data[i]._id,
                });
            }
            setRifleData(newArr);
        })
            .catch((errors) => {
                console.log({ errors })
                setLoading(false)
            })
    };
    const getlateSeasons = () => {
        dispatch(SettingService.getlateseason()).then((res) => {
            const newArr = [];
            for (let i = 0; i < res.data.length; i++) {
                newArr.push({
                    label: res.data[i].name,
                    value: res.data[i]._id,
                });
            }
            setlateSeasonData(newArr);
        })
            .catch((errors) => {
                console.log({ errors })
                setLoading(false)
            })
    };

    useEffect(() => {
        getStates();
    }, [serach]);
    
    useEffect(() => {
        getlateSeasons();
        getRifleSeasons();
    }, []);

    const columnss = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
            render: (text) => <div>{text + 1}</div>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
        dispatch(SettingService.updateStateDetails(values))
            .then((res) => {
                getStates();
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
        setRifleID('')
        setlateSeasonID('')
        if (e) {
            setId(e?.id)
            setRifleID(e?.rifle)
            setlateSeasonID(e?.late_season)
            form.setFieldsValue({
                name: e.name,
                archry_oct: e.archry_oct,
                muzzele_loader: e.muzzele_loader,
                rifle: e.rifle,
                late_season: e.late_season,
                bear: e.bear,
                turkey: e.turkey,
                state_website: e.state_website,
                check_in_game_link: e.check_in_game_link,
            });
        } else {
            form.resetFields();
        }
    }

    const handleChangeName = (e) => {
        setRifleID(e);
        form.setFieldValue('rifle', e)
    }
    const handlelateChangeName = (e) => {
        setlateSeasonID(e);
        form.setFieldValue('late_season', e)
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
                title={"Edit State Data"}
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
                        <label className="label-name">Name</label>
                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: "Please Enter Name" },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Name.."
                                disabled={true}
                            />
                        </Form.Item>

                        <label className="label-name">Archary Oct</label>
                        <Form.Item
                            name="archry_oct"
                            rules={[
                                { required: true, message: "Please Enter Archary Oct" },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Archary Oct.."
                            />
                        </Form.Item>
                        <label className="label-name">Muzzle Loader</label>
                        <Form.Item
                            name="muzzele_loader"
                            rules={[
                                { required: true, message: "Please Enter Muzzle Loader" },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Muzzle Loader.."
                            />
                        </Form.Item>
                        <label className="label-name">Rifle Season</label>
                        <Form.Item
                            name="rifle"
                            rules={[{ required: true, message: "Please Select Rifle Season" }]}
                        >
                            <Space
                                style={{
                                    width: '100%',
                                }}
                                direction="vertical"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Please select Rifle Season"
                                    style={{
                                        width: '100%',
                                    }}
                                    value={rifleId || undefined}
                                    onChange={handleChangeName}
                                    options={rifledata}
                                    filterOption={(inputValue, option) =>
                                        option.label ? option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false
                                    }
                                />
                            </Space>

                        </Form.Item>
                        <label className="label-name">Late Season</label>
                        <Form.Item
                            name="late_season"
                            rules={[{ required: true, message: "Please Select Late Season" }]}
                        >
                            <Space
                                style={{
                                    width: '100%',
                                }}
                                direction="vertical"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Please select Late Season"
                                    style={{
                                        width: '100%',
                                    }}
                                    value={seasonId || undefined}
                                    onChange={handlelateChangeName}
                                    options={lateseasons}
                                    filterOption={(inputValue, option) =>
                                        option.label ? option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false
                                    }
                                />
                            </Space>

                        </Form.Item>
                       
                        <label className="label-name">Bear</label>
                        <Form.Item
                            name="bear"
                            rules={[
                                { required: true, message: "Please Enter Bear" },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Bear.."
                            />
                        </Form.Item>
                        <label className="label-name">Turkey</label>
                        <Form.Item
                            name="turkey"
                            rules={[
                                { required: true, message: "Please Enter Turkey" },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Turkey.."
                            />
                        </Form.Item>
                        <label className="label-name">State Website</label>
                        <Form.Item
                            name="state_website"
                            rules={[
                                { required: true, message: "Please Enter State Website" },
                                {
                                    pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                    message: 'Enter a valid URL'
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="State Website.."
                            />
                        </Form.Item>
                        <label className="label-name">Check in game link</label>
                        <Form.Item
                            name="check_in_game_link"
                            rules={[
                                { required: true, message: "Please Enter Check in game link" },
                                {
                                    pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                    message: 'Enter a valid URL'
                                },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Check in game link.."
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

export default State;
