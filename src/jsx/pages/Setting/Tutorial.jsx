import React, { useEffect, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal, Table } from 'antd';
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


const Tutorial = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [visiblemail, setVisiblemail] = useState(false);
    const [Id, setId] = useState("");

    const getTutorial = () => {
        dispatch(supportService.getTutorial())
            .then((res) => {
                console.log(res.data)
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            id: res.data[i]._id,
                            title: res.data[i].title,
                            link: res.data[i].link,
                            description: res.data[i].description,
                            status: res.data[i].status,
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
        getTutorial();
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (text, data) => (
                <div >
                <a style={{color:"blue"}} href={text} target="_blank" rel="noopener noreferrer">Click here.</a>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, data) => (
                <div>
                    {data.status === 1 ? <Badge bg=" badge-lg " className='badge-primary light badge-xs' style={{ cursor: 'pointer' }} onClick={() => activeInactive(data.id)} >Active</Badge>
                        : <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }} onClick={() => activeInactive(data.id)} >Deactive</Badge>}
                </div>
            ),
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
                    </div>
                </>
            ),
        },
    ];

    const handleSubmit = (values) => {
        // values.question = values.question.trim();
        const apicall =
            Id === ""
                ? supportService.createTutorial(values) : supportService.updateTutorial(Id, values);
        dispatch(apicall)
            .then((res) => {
                setVisible(false);
                setVisiblemail(false);
                setId('');
                getTutorial();
                ToastMe(res.data.message, "success");
            })
            .catch((errors) => {
                console.log({ errors });
            });
    };

    const editModal = (e) => {
        setId("")
        setVisible(true);
        if (e) {
            setId(e?.id)
            form.setFieldsValue({
                title: e.title,
                description: e.description,
                link: e.link,
            });
        } else {
            form.resetFields();
        }
    }

    const activeInactive = (text) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "To Change Status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(supportService.changetutorialStatus(text))
                    .then((res) => {
                        getTutorial();
                        ToastMe("Status Change Successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    }

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Tutorial</h4>
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
                title={Id ? "Edit Tutorial" : "Add Tutorial"}
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
                            name="title"
                            rules={[
                                { required: true, message: "Please Title" },
                                { pattern: new RegExp(".*\\S.*[a-zA-z0-9 ]"), message: 'Only space is not allowed' }

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Enter Title.."
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <label className="label-name">Link</label>
                        <Form.Item
                            name="link"
                            rules={[
                                { required: true, message: "Please Link" },
                                { pattern: /^(https?:\/\/)?([\w.-]+)(\.\w{2,})(\/\S*)?$/, message: 'Enter a valid URL' },

                            ]}
                        >
                            <Input
                                type="text"
                                placeholder="Enter Link.."
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <label className="label-name">Description</label>
                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please Description"
                                },
                                { pattern: new RegExp(".*\\S.*[a-zA-z0-9 ]"), message: 'Only space is not allowed' }
                            ]}
                        >
                            <TextArea
                                autoSize={{ minRows: 4, maxRows: 6 }}
                                type="text"
                                placeholder='Enter Description'
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

export default Tutorial