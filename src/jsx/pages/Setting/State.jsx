import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Empty, Form, Input, Modal, Select, Space, Table } from "antd";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import ToastMe from "../Common/ToastMe";
import { SearchOutlined } from "@ant-design/icons";
import SettingService from "../../../services/setting";
import { Add, CloseCircle } from "iconsax-react";


const SeasonComponent = ({ setAlldata, setLoading, form, i, row, alldata, rifledata }) => {
    const [lateseasons, setlateSeasonData] = useState([]);
    const dispatch = useDispatch();

    const handleChangeName = (field, index, value) => {
        let newData = [...alldata];
        newData[index][field] = value;
        setAlldata(newData)
        getlateSeasons(value);
        // form.setFieldValue('season', value)
    }

    const handlelateChangeName = (field, index, value) => {

        let newData = [...alldata];
        newData[index][field] = value;
        setAlldata(newData)
        // form.setFieldValue('late_season', value)
    }

    const getlateSeasons = (e) => {
        dispatch(SettingService.getlateseason(e)).then((res) => {
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
        if (row?.season) {
            getlateSeasons(row?.season);
        }
    }, [row])
    const validateSeasonData = () => {
        if (!rifledata || rifledata.length === 0) {
            return {
                validateStatus: "error",
                help: "No data available for season",
            };
        }

        if (!row?.late_season || row?.late_season.length === 0) {
            return {
                validateStatus: "error",
                help: "Please select late season",
            };
        }

        return {};
    };

    const validateSeason = () => {
        if (!rifledata || rifledata.length === 0) {
            return {
                validateStatus: "error",
                help: "No data available for season",
            };
        }

        if (!row?.season) {
            return {
                validateStatus: "error",
                help: "Please select season",
            };
        }

        return {};
    };



    return (
        <div className="d-flex gap-3">
            <div className="w-100">
                <label className="label-name">Season</label>
                <Form.Item
                    name={`season_${i}`}
                    {...validateSeason()}
                // rules={[{ required: true, message: "Please Select Season" }]}
                >
                    <Space
                        style={{
                            width: '100%',
                        }}
                        direction="vertical"
                    >
                        <Select
                            placeholder="Please select Season"
                            style={{
                                width: '100%',
                            }}
                            value={row?.season || undefined}
                            onChange={(e) => handleChangeName(`season`, i, e)}
                            options={rifledata}
                            filterOption={(inputValue, option) =>
                                option.label ? option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false
                            }
                        />
                    </Space>

                </Form.Item>
            </div>
            <div className="w-100">
                <label className="label-name">Late Season</label>
                <Form.Item
                    name={`late_season_${i}`}
                    {...validateSeasonData()}
                // rules={[{ required: true, message: "Please Select Late Season" }]}
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
                            value={row?.late_season || undefined}
                            onChange={(e) => handlelateChangeName(`late_season`, i, e)}
                            options={lateseasons}
                            filterOption={(inputValue, option) =>
                                option.label ? option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 : false
                            }
                        />
                    </Space>

                </Form.Item>
            </div>
        </div >
    )

}

const State = () => {
    const arraysmpatons = [{
        season: ""
    }]
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
    const [alldata, setAlldata] = useState(arraysmpatons);




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
            // console.log(res.data);
            var newArr = [];
            for (var i = 0; i < res?.data.length; i++) {
                newArr.push({
                    key: i,
                    id: res?.data[i]._id,
                    name: res?.data[i].name,
                    archry_oct: res?.data[i].archry_oct,
                    season: res?.data[i].season,
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
    const search = ""
    const getRifleSeasons = () => {
        dispatch(SettingService.getRifleSeasons(search)).then((res) => {
            const newArr = [];
            for (let i = 0; i < res.data.length; i++) {
                newArr.push({
                    label: res.data[i].name,
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
    const getlateSeasons = (e) => {
        dispatch(SettingService.getlateseason(e)).then((res) => {
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
        // getlateSeasons();
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
    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                // Check if there are any validation errors
                const errors = form.getFieldsError();
                const hasErrors = Object.keys(errors).some(field => errors[field]);
                console.log(errors, hasErrors);
                const missingData = alldata.some(row => !row?.season || !row?.late_season || row?.late_season.length === 0);
                if (missingData) {
                    return;
                }

                // Proceed with form submission
                values.id = Id;
                values.season = alldata;
                dispatch(SettingService.updateStateDetails(values))
                    .then((res) => {
                        getStates();
                        ToastMe(res?.data?.message, 'success');
                        setVisible(false);
                        setId('');
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });
            })
            .catch((errors) => {
                console.log(errors);
            });
    };


    useEffect(() => {
        document.title = 'Admin | States '
    }, [])

    const editModal = (e) => {
        // console.log(e);
        setId("")
        setVisible(true);
        setRifleID('')
        setlateSeasonID('')
        if (e) {
            setId(e?.id)
            if (e?.season?.length) {
                setAlldata(e?.season)
                e?.season?.forEach((datas, i) => {
                    // console.log(datas);
                    form.setFieldsValue({ [`season_${i}`]: datas.season });
                })
            } else {
                setAlldata([{
                    season: ""
                }])
            }
            // setRifleID(e?.rifle)
            // setlateSeasonID(e?.late_season)
            form.setFieldsValue({
                name: e.name,
                // archry_oct: e.archry_oct,
                // muzzele_loader: e.muzzele_loader,
                // rifle: e.rifle,
                // late_season: e.late_season,
                // "season_0": e.season,
                // bear: e.bear,
                // turkey: e.turkey,
                state_website: e.state_website,
                check_in_game_link: e.check_in_game_link,
            });
        } else {
            form.resetFields();
        }
    }

    const handleChangeName = (field, index, value) => {
        let newData = [...alldata];
        newData[index][field] = value;
        setAlldata(newData)
        setRifleID(value);
        getlateSeasons(value);
        form.setFieldValue('season', value)
    }

    const handlelateChangeName = (field, index, value) => {

        let newData = [...alldata];
        newData[index][field] = value;
        setAlldata(newData)
        setlateSeasonID(value);
        form.setFieldValue('late_season', value)
    }

    const handleClick = () => {
        setAlldata([...alldata, {
            "data": {}
        }]);
        // }
    };

    const handleDeleteClick = (index) => {
        setAlldata((prevArray) => {
            const newArray = [...prevArray];
            // if (newArray[index]) {
            if (index >= 0 && index < newArray.length) {
                newArray.splice(index, 1);
            }
            // }
            return newArray;
        })
        alldata.map((t) => {
            form.setFieldsValue({ [`symptoms_${index}`]: t?.symptoms });
        })

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
                        {/* <label className="label-name">Archary Oct</label> */}
                        {/* <Form.Item
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
                        </Form.Item> */}
                        {alldata?.map((row, i) => (
                            <>
                                <div className="text-end">
                                    {
                                        i < 1 ?
                                            <a role='button' className='btn-link flex_item_ce gap1 text-success' onClick={handleClick} title='Add'><Add size="24" color="#0D0B0B" /> </a>
                                            : <a role='button' className='btn-link flex_item_ce gap1 text-warning' onClick={() => handleDeleteClick(i)} title='cancel'><CloseCircle size="24" color="#ff0100" /> </a>
                                    }
                                </div>

                                <SeasonComponent setAlldata={setAlldata} setLoading={setLoading} form={form} i={i} row={row} alldata={alldata} rifledata={rifledata} />
                            </>
                        ))}
                        {/* <label className="label-name">Bear</label>
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
                        </Form.Item>*/}
                        <label className="label-name">State Website</label>
                        <Form.Item
                            name="state_website"
                        // rules={[
                        //     { required: true, message: "Please Enter State Website" },
                        //     {
                        //         pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                        //         message: 'Enter a valid URL'
                        //     },
                        // ]}
                        >
                            <Input
                                type="text"
                                placeholder="State Website.."
                            />
                        </Form.Item>
                        <label className="label-name">Check in game link</label>
                        <Form.Item
                            name="check_in_game_link"
                        // rules={[
                        //     { required: true, message: "Please Enter Check in game link" },
                        //     {
                        //         pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                        //         message: 'Enter a valid URL'
                        //     },

                        // ]}
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
            </Modal >
        </>
    );
};

export default State;
