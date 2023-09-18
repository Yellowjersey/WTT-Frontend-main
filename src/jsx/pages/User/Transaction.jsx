import React, { useEffect, useMemo, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { Badge, Button, Dropdown, Empty, Input, Table } from "antd";
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
            subscriptionCurrency: res[i].subscription_currency,
            discount: res[i].discount,
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
      dataIndex: "discount",
      key: "discount",
      render: (text) => {
        return <span>{text ? text + "%" : '-'}</span>;
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

  const items = [
    {
      key: 8,
      label: (
        <a onClick={() => handleFilterChange()} >
          All
        </a>
      ),
    },
    {
      key: '0',
      label: (
        <a onClick={() => handleFilterChange(0)} >
          Pending
        </a>
      ),
    },
    {
      key: '1',
      label: (
        <a onClick={() => handleFilterChange(1)} >
          Running
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => handleFilterChange(2)} >
          Update
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={() => handleFilterChange(3)} >
          Fail
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={() => handleFilterChange(4)} >
          Cancel
        </a>
      ),
    },
  ];


  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Transaction</h4>
          <div className="d-flex gap-2">
            <div>
              <Input placeholder='Search....' onChange={(e) => handleSearch(e)} prefix={<SearchOutlined className="site-form-item-icon" />} />
            </div>
            <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }} >
              {/* <span style={{backgroundColor:"#44814f", color:"#ffffff" , padding:"5px 8px" , borderRadius:"6px" , fontSize:"14px"}}> Filter by Status </span> */}
              <Button className="btn-primary">Status</Button>
            </Dropdown>
          </div>
        </div>
        <div className="card-body">
          {/* <Row> */}
          {filteredData && filteredData?.length > 0 ? (
            <Table
              dataSource={filteredData}
              columns={columnss}
              className="table_custom"
            />
          ) : (
            <Empty />
          )}
          {/* </Row> */}
        </div>
      </div>

    </>
  );
};

export default Transaction;
