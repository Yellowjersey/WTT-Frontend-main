import React, {  useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import {  Col, Empty,  Row,  Table } from 'antd';
import { Badge, Dropdown } from "react-bootstrap";
import moment from 'moment';
import Swal from 'sweetalert2';
import ToastMe from '../Common/ToastMe';
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import { phoneFormate } from "../helper";


const Work = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState(null);

    const getBrokerList = (value) => {
        dispatch(UserService.getBroker(value))
            .then((res) => {
                var newArr = [];
                for (var i = 0; i < res.data.length; i++) {
                    newArr.push(
                        {
                            key: i,
                            firstName: res.data[i].firstName,
                            lastName: res.data[i].lastName,
                            companyName: res.data[i].companyName,
                            email: res.data[i].email,
                            id: res.data[i]._id,
                            mobile: res.data[i].mobile,
                            createdAt: res.data[i].createdAt,
                            isApprove: res.data[i].isApprove,
                        }
                    )
                }
                setData(newArr);
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }

    const handleFilterChange = (filterOption) => {
        setSelectedFilter(filterOption);
    };

    const approvePendingUser = (text) => {
        let data = {};
        data.userid = text.id
        data.status = text.status = 0 ? 1 : 0
        Swal.fire({
            title: 'Are you sure?',
            text: "To change this User status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(UserService.changeUserStatus(data))
                    .then((res) => {
                        getBrokerList();
                        ToastMe("User status change successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    };

    const rejectUser = (text) => {
        let data = {};
        data.userid = text.id
        data.status = text.status = 2
        Swal.fire({
            title: 'Are you sure?',
            text: "To change this User status!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(UserService.changeUserStatus(data))
                    .then((res) => {
                        getBrokerList();
                        ToastMe("User rejected successfully", 'success')
                    })
                    .catch((errors) => {
                        console.log({ errors })
                    })
            }
        })
    };


    const filteredData = useMemo(() => {
    if (selectedFilter === null) return data; // No filter selected, return all data

    // Filter based on the "isApprove" property
    return data.filter((item) => {
        if (selectedFilter === 0) {
            return item.isApprove === 0; // Filter for "Pending" brokers
        } else if (selectedFilter === 1) {
            return item.isApprove === 1; // Filter for "Approved" brokers
        } else if (selectedFilter === 2) {
            return item; // Filter for "Approved" brokers
        } 
        return true;
    });
    }, [data, selectedFilter]);
    
    const viewSubUser = (text) => {
        props.history.push("/sub-user-list",{state:text})
    }

    const LinkListData = (text) => {
        props.history.push("/link-list",{state:text})
    }

    useEffect(() => {
        getBrokerList();
    },[])

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

   

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">How it Work</h4>
                    {/* <div>
                        <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            Filter by Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleFilterChange(2)}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterChange(1)}>Approved</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFilterChange(0)}>Pending</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </div> */}
                </div>
                <div className="card-body">
                <Row span={24} >
                    <Col style={{border:"2px solid black" , margin:"0 15px"}} xs={24} lg={11}>1</Col>
                    <Col style={{border:"2px solid black", margin:"0 15px"}} xs={24} lg={11}>2</Col>
                </Row>
                </div>
            </div>
        </>
    )
}

export default Work