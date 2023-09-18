import React, { useEffect, useMemo, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Button, Empty, Input, Table, Dropdown as AntdDropDown } from "antd";
import moment from "moment";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import { phoneFormate } from "../helper";
import Swal from "sweetalert2";
import ToastMe from "../Common/ToastMe";
import { SearchOutlined } from "@ant-design/icons";
import { Badge, Dropdown, DropdownButton } from "react-bootstrap";

const User = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serach, setSerach] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [statusFilterName, setStatusFilterName] = useState('Filter By Status');

  const getUserList = (value) => {
    dispatch(UserService.getUser(serach)).then((res) => {
      var newArr = [];
      for (var i = 0; i < res.data.length; i++) {
        newArr.push({
          key: i,
          firstName: res.data[i].firstname,
          lastName: res.data[i].lastname,
          email: res.data[i].email,
          img: res.data[i].image,
          id: res.data[i]._id,
          mobile: res.data[i].mobile,
          status: res.data[i].status,
          is_subscription: res.data[i].is_subscription,
          createdAt: res.data[i].createdAt,
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


  const approvePendingUser = (text) => {
    let data = {};
    data.userid = text.id
    data.status = text.status
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
            getUserList();
            setSelectedFilter(null);
            setStatusFilterName('All')
            ToastMe("User status change successfully", 'success')
          })
          .catch((errors) => {
            console.log({ errors })
            setLoading(false);
          })
      }
    })
  };

  useEffect(() => {
    getUserList();
  }, [serach]);

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

  let firstInitial;
  let lastInitial;
  const columnss = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text) => <div>{text + 1}</div>,
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => {
        firstInitial = text ? text[0].toUpperCase() : '';;
        return text;
      }
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => {
        lastInitial = text ? text[0].toUpperCase() : '';;
        return text
      }
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => {
        return (
          text === null
            ? (<div id="profileImage" style={{ background: '#a6a7ac', borderRadius: "50%", color: '#fff', textAlign: 'center', width: '50px', height: '50px', lineHeight: '50px', margin: '20px 0' }}>
              {firstInitial + lastInitial}
            </div>)
            : <img src={process.env.REACT_APP_PROFILE_URL + 'users/' + text} width="50px" height="50px" style={{ borderRadius: "50%" }} />
        );
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (text) => {
        return <span>{text ?? "-"}</span>;
      },
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (text, data) => (
        <div>
          {data.status === 1 ? <Badge bg=" badge-lg " className='badge-primary light badge-xs' style={{ cursor: 'pointer' }} onClick={() => approvePendingUser(data)} >Active</Badge>
            : <Badge bg=" badge-lg " className='badge-danger light badge-xs' style={{ cursor: 'pointer' }} onClick={() => approvePendingUser(data)} >Deactive</Badge>}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{moment(text).format("DD MMM YYYY h:mm A")}</div>,
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
              {
                text.readStatusCount > 0 ?
                  <span className="badge light text-white bg-danger rounded-circle">{text.readStatusCount}</span> : ''
              }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => viewUser(text)}>View</Dropdown.Item>
              {/* <Dropdown.Item onClick={() => viewChat(text)}>Chat</Dropdown.Item> */}
              {/* <Dropdown.Item onClick={() => editModal(text)}>Edit</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </>
      )
    },
  ];

  const viewUser = (text) => {
    props.history.push("/user-detail", { userDetail: text })
  }

  const handleSearch = (e) => {
    setSerach(e.target.value)
  }

  const handleFilterChange = (filterOption) => {
    if (filterOption === 0) {
      setStatusFilterName('Deactive')
    } else if (filterOption === 1) {
      setStatusFilterName('Active')
    } else {
      setStatusFilterName('All')
    }
    setSelectedFilter(filterOption);
  };

  const filteredData = useMemo(() => {
    if (selectedFilter === null) return data;
    return data.filter((item) => {
      if (selectedFilter === 0) {
        return item.status === 0;
      } else if (selectedFilter === 1) {
        return item.status === 1;
      }
      return true;
    });
  }, [data, selectedFilter]);



  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">User List</h4>
          <div className="d-flex gap-2">
            <div>
              <Input placeholder='Search....' onChange={(e) => handleSearch(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
            </div>
            <DropdownButton
              title={statusFilterName}
            >
              <Dropdown.Item onClick={() => handleFilterChange()} active>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange(1)} >Active</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange(0)} >Deactive</Dropdown.Item>
            </DropdownButton>
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
    </>
  );
};

export default User;
