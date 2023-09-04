import React, { useEffect, useState } from 'react';
import '../../components/table/FilteringTable/filtering.css';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Modal, Table, Button, Input, Form, Empty } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";
import ToastMe from '../Common/ToastMe';
import Swal from 'sweetalert2';
import moment from "moment";
import PageLoader from '../Common/PageLoader';
import supportService from '../../../services/support';


const SupportTicket = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const viewTicket = (text) => {
        props.history.push("/view-ticket", { state: text.id })
    }

    // const onSubmit = (values) => {
    //     dispatch(UserService.sendNotification(values))
    //         .then((res) => {
    //             getTicketList();
    //             form.setFieldsValue({
    //                 title: '',
    //                 message: '',
    //             })
    //             ToastMe(res.data.message, 'success')
    //         })
    //     setVisible(false)
    //         .catch((errors) => {
    //             console.log({ errors })
    //         })
    // }

    const getTicketList = () => {
        dispatch(supportService.getTicketList())
            .then((res) => {
                let newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            user_name: res.data[i].user_name || '-',
                            subject: res.data[i].subject || '-',
                            description: res.data[i].description || '-',
                            status: res.data[i].status || '-',
                            id: res.data[i]._id || '-',
                        }
                    )
                }
                setData(newArr);
                setLoading(false);
            })
            .catch((errors) => {
                setLoading(false);
                console.log({ errors })
            })
    }

    useEffect(() => {
        getTicketList();
    }, [])

    const svg1 = (
        <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24"></rect>
                <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                <circle fill="#000000" cx="19" cy="12" r="2"></circle>
            </g>
        </svg>
    );

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
            title: 'User Name',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (text, data) => (
                <div style={{ cursor: 'pointer' }}>
                    {data.status === 1 ? <Badge bg=" badge-lg " className='badge-warning badge-lg' >Open</Badge>
                        : <Badge bg=" badge-lg " className='badge-secondary badge-lg'>Close</Badge>}
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text) => (
                <>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="danger"
                            className="light sharp i-false badge_label"
                        >
                            {svg1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => viewTicket(text)}>View</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        },
    ];

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        {
                            data && data.length > 0 ?
                                <Table dataSource={data} columns={columnss} className='table_custom' /> : <Empty />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportTicket