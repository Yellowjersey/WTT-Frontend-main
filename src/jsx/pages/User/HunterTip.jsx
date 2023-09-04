import React, { useEffect, useMemo, useState } from 'react';
import UserService from '../../../services/user';
import { useDispatch } from 'react-redux';
import { Button,Form, Empty, Table, Modal, Input } from 'antd';
import { Dropdown } from "react-bootstrap";
import 'react-phone-input-2/lib/style.css';
import PageLoader from '../Common/PageLoader';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';
import ToastMe from "../Common/ToastMe";


const HunterTip = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null)

    const gethuntertip = (value) => {
        dispatch(UserService.gethuntertip(value))
            .then((res) => {
                var newArr = [];
                res.data.map((element, index) => {
                    return newArr.push({ key: index, ...element });
                })
                setData(newArr)
                setLoading(false)
            })
            .catch((errors) => {
                console.log({ errors })
            })
    }



    const filteredData = useMemo(() => {
        return data
    }, [data]);


    useEffect(() => {
        gethuntertip();
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
            dataIndex: "key",
            key: "key",
            render: (text) => <div>{text + 1}</div>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (data) => (
                <p style={{ width: "200px" }}>  {data === '' || data === null ? "-" : data}</p>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (data) => (
                data === '' || data === null ? "-" : data
            )
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (data) => (
                <p style={{ width: "100px" }}>  {data === '' || data === null ? "-" : data === 1 ? "Active" : "Deactive"}</p>
            )
        },
    ];
    const editModal = (text) => {
        // setId("")
        setVisible(true);
        if (text) {
        //   setId(text?._id);
        //   form.setFieldsValue({
        //     humandescription: text.humandescription,
        //     deerdescription: text.deerdescription,
        //   });
        } else {
          form.resetFields();
        }
      };
      const handleSubmit = (values) => {
        // if (Id !== "") {
        //   values.id = Id;
        //   if (Name === "deer") {
        //     values.deerimage = images;
        //   } else {
        //     values.humanimage = images;
        //   }
        // }
        
        
         
        dispatch(UserService.createhntertip(values))
          .then((res) => {
            gethuntertip();
            // setId("");
            setVisible(false);
            ToastMe(res.data.message, "success");
          })
          .catch((errors) => {
            console.log({ errors });
          });
      };

    return (
        <>
            <PageLoader loading={loading} />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Hunter Tip List</h4>
                    <Button type="primary" onClick={() => editModal()}>
                        Add HunterTip
                    </Button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {filteredData && filteredData.length > 0 ? (
                            <Table dataSource={filteredData} columns={columnss} className='table_custom' />
                        ) : (
                            <Empty />
                        )}
                    </div>
                </div>
            </div>
            <Modal
        open={visible}
        title={"Add Hunter Tip"}
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
          <label className="label-name">Title</label>
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Please Enter Title" },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter Title"
            />
          </Form.Item>

          <label className="label-name">Description</label>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please Enter Description" },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 4, maxRows: 6 }}
              type="text"
              placeholder="Enter Description"
            />
          </Form.Item>
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

export default HunterTip