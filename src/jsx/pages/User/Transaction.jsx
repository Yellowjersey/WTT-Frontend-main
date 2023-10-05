import React, { useEffect, useMemo, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Badge, Button, Empty, Input, Table } from "antd";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const Transaction = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serach, setSerach] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [statusFilterName, setStatusFilterName] = useState('Filter By Status');

  const UserSubscription = () => {
    dispatch(UserService.getusersubscription(serach))
      .then((res) => {
        var newArr = [];
        for (var i = 0; i < res.length; i++) {
          newArr.push({
            key: i,
            firstName: res[i].user_first,
            lastName: res[i].user_last,
            orderId: res[i].order_id,
            SubscriptionPrice: res[i].subscription_price,
            total: res[i].total_price,
            subscriptionCurrency: res[i].subscription_currency,
            coupon_id: res[i].coupon_id,
            startdate: res[i].start_date,
            enddate: res[i].end_date,
            paymentstatus: res[i].payment_status,
            createdAt: res[i].createdAt,
          });
        }
        setData(newArr);
        setLoading(false);
      })
      .catch((errors) => {
        console.log({ errors });
        setLoading(false)
      });
  };

  useEffect(() => {
    UserSubscription();
  }, [serach]);

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
      title: "First Name",
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
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Subscription Price",
      dataIndex: "SubscriptionPrice",
      key: "SubscriptionPrice",
      render: (text) => {
        return <span>{`$` + text ?? "-"}</span>;
      },
    },
    {
      title: "Discount",
      dataIndex: "coupon_id",
      key: "coupon_id",
      render: (text) => {
        return <span>{text == null ?  '-' : "10%"}</span>;
      },
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      render: (text) => {
        return <span>{`$${text?.toFixed(2)}` ?? "-"}</span>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
      key: "startdate",
      render: (text) => {
        return <span>{text === null ? "-" : moment(text).format("DD MMM YYYY h:mm A")}</span>;
      },
    },
    {
      title: "End Date",
      dataIndex: "enddate",
      key: "enddate",
      render: (text) => {
        return <span>{text === null ? "-" : moment(text).format("DD MMM YYYY h:mm A")}</span>;
      },
    },
    {
      // '0 = pending, 1 = running, 2 = update, 3 = fail, 4 = cancel'
      title: "Payment Status",
      dataIndex: "paymentstatus",
      key: "paymentstatus",
      render: (text) => {
        return <div>
          {text === 0 ? <Badge bg=" badge-lg" className='badge badge-pill badge-warning light badge-lg' style={{ cursor: 'pointer' }} >Pending</Badge>
            : text === 1 ? <Badge bg=" badge-lg " className='badge badge-pill badge-success light badge-lg' style={{ cursor: 'pointer' }}>Running</Badge>
              : text === 2 ? <Badge bg=" badge-lg " className='badge badge-pill badge-info light badge-lg' style={{ cursor: 'pointer' }}>Update</Badge>
                : text === 3 ? <Badge bg=" badge-lg " className='badge badge-pill badge-danger light badge-lg' style={{ cursor: 'pointer' }}>Fail</Badge>
                  : text === 4 ? <Badge bg=" badge-lg " className='badge badge-pill badge-danger light badge-lg' style={{ cursor: 'pointer' }}>Cancel</Badge>
                    : "-"
          }
        </div>
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{moment(text).format("DD MMM YYYY h:mm A")}</div>,
    }
  ];

  const handleFilterChange = (filterOption) => {
    if (filterOption === 0) {
      setStatusFilterName('Pending')
    } else if (filterOption === 0) {
      setStatusFilterName('Pending')
    } else if (filterOption === 1) {
      setStatusFilterName('Running')
    } else if (filterOption === 2) {
      setStatusFilterName('Update')
    } else if (filterOption === 3) {
      setStatusFilterName('Fail')
    } else if (filterOption === 4) {
      setStatusFilterName('Cancel')
    } else {
      setStatusFilterName('All')
    }
    setSelectedFilter(filterOption);
  };

  const handleSearch = (e) => {
    setSerach(e.target.value)
  }

  const filteredData = useMemo(() => {
    if (selectedFilter === null) return data;
    return data.filter((item) => {
      if (selectedFilter === 0) {
        return item.paymentstatus === 0;
      } else if (selectedFilter === 1) {
        return item.paymentstatus === 1;
      } else if (selectedFilter === 2) {
        return item.paymentstatus === 2;
      } else if (selectedFilter === 3) {
        return item.paymentstatus === 3;
      } else if (selectedFilter === 4) {
        return item.paymentstatus === 4;
      }
      return true;
    });
  }, [data, selectedFilter]);



  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Transaction</h4>
          <div className="d-flex gap-2">
            <div className="search_feild">
              <Input placeholder='Search....' onChange={(e) => handleSearch(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
            </div>
            <DropdownButton title={statusFilterName === "All" ? "Filter By Status" : statusFilterName} className="custom_dd">
              <Dropdown.Item onClick={() => handleFilterChange()} active>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange(0)} >Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange(1)} >Running</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange(2)} >Update</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange(3)} >Fail</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange(4)} >Cancel</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="card-body">
          {filteredData && filteredData?.length > 0 ? (
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

    </>
  );
};

export default Transaction;
