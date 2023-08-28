import React, { useEffect, useMemo, useState } from "react";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Upload,
} from "antd";
import { Badge, Dropdown } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import ToastMe from "../Common/ToastMe";
import "react-phone-input-2/lib/style.css";
import PageLoader from "../Common/PageLoader";
import { phoneFormate } from "../helper";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import { DocumentUpload } from "iconsax-react";

const Work = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleimg, setVisibleimg] = useState(false);
  const [Id, setId] = useState("");
  var [contractDocument, setContractDocument] = useState([]);

  const gerWork = (value) => {
    dispatch(UserService.getwork(value))
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((errors) => {
        console.log({ errors });
      });
  };

  useEffect(() => {
    gerWork();
  }, []);

  const handleSubmit = (values) => {
    if (Id !== "") {
      values.id = Id;
    }
    const apicall =
      Id === ""
        ? UserService.creatework(values)
        : UserService.updatework(values);
    dispatch(apicall).then((res) => {
      gerWork();
      setId("");
      ToastMe(res.data.message, "success");
    });
    setVisible(false).catch((errors) => {
      console.log({ errors });
    });
  };

  const editModal = (text) => {
    setVisible(true);
    if (text) {
      setId(text._id);
      form.setFieldsValue({
        humandescription: text.humandescription,
        deerdescription: text.deerdescription,
      });
    } else {
      form.resetFields();
    }
  };

  const editimageupload = () => {
    setVisibleimg(true);
  };
  let checkImageType = (info) => {
    const { file } = info;
    const formData = new FormData();
    formData.append('image', file);
    console.log(file);
    console.log(formData);
    // const apicall =
    //   Id === ""
    //     ? UserService.creatework(values)
    //     : UserService.updatework(values);
    dispatch(UserService.updateimage(formData)).then((res) => {
      // gerWork();
      // setId("");
      ToastMe(res.data.message, "success");
    });
    setVisibleimg(false).catch((errors) => {
      console.log({ errors });
    });
  };



  return (
    <>
      <PageLoader loading={loading} />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">How it Work</h4>
          <Button type="primary" onClick={() => editModal()}>
            Add Description
          </Button>
        </div>
        <div className="card-body">
          <Row span={24}>
            <Col style={{ margin: "0 15px" }} xs={24} lg={11}>
              <h1 style={{ textAlign: "center" }}>Human Vision</h1>
              <div style={{ position: "relative" }}>
                <img
                  style={{ objectFit: "cover" }}
                  src={`http://localhost:4000/uploads/admin/${data[0]?.humanimage}`}
                  width="100%"
                  alt=""
                  srcset=""
                />
                <Button
                  style={{ position: "absolute", right: "0" }}
                  type="dashed"
                  onClick={() => editimageupload()}
                >
                  {" "}
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </Button>
              </div>
              {/* <div>
                {data?.map((text) => {
                  return <p>{text?.humandescription}</p>;
                })}
              </div> */}
            </Col>
            <Col style={{ margin: "0 15px" }} xs={24} lg={11}>
              <h1 style={{ textAlign: "center" }}>Deer Vision</h1>
              <div style={{ position: "relative" }}>
                <img
                  src={`http://localhost:4000/uploads/admin/${data[0]?.deerimage}`}
                  width="100%"
                  alt=""
                  srcset=""
                />
                <Button
                  style={{ position: "absolute", right: "0" }}
                  type="dashed"
                >
                  {" "}
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </Button>
              </div>
              {/* <div>
                {data?.map((text) => {
                  return <p>{text?.deerdescription}</p>;
                })}
              </div> */}
            </Col>
          </Row>
          {data?.map((text) => {
            return (
              <Row style={{ margin: "10px 0" }} span={24}>
                <Col style={{ margin: "0 15px" }} xs={24} lg={11}>
                  {text?.humandescription}
                </Col>
                <Col style={{ margin: "0 15px" }} xs={24} lg={11}>
                  {text?.deerdescription}
                </Col>
                <Button
                  style={{ position: "absolute", right: "0" }}
                  type="dashed"
                  onClick={() => editModal(text)}
                >
                  {" "}
                  <i class="fa fa-edit" aria-hidden="true"></i>
                </Button>
              </Row>
            );
          })}
        </div>
      </div>
      <Modal
        open={visible}
        title={Id === "" ? "Add Description" : "Edit Description"}
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        footer={
          [
            // <Button
            //     key="submit"
            //     type="primary"
            //     onClick={() => {
            //         // form.validateFields()
            //         //     .then((values) => {
            //         //         onSubmit(values);
            //         //     })
            //         //     .catch((info) => {
            //         //         console.log("Validate Failed:", info);
            //         //     });
            //     }}
            // >
            //     Submit
            // </Button>
          ]
        }
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <label className="label-name">Human Description</label>
          <Form.Item
            name="humandescription"
            rules={[
              { required: true, message: "Please Enter Human Description" },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 4, maxRows: 6 }}
              type="text"
              placeholder="Enter Human Description"
            />
          </Form.Item>

          <label className="label-name">Deer Description</label>
          <Form.Item
            name="deerdescription"
            rules={[
              { required: true, message: "Please Enter Deer Description" },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 4, maxRows: 6 }}
              type="text"
              placeholder="Enter Deer Description"
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

      <Modal
        open={visibleimg}
        title={"Update image"}
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        footer={
          [
            // <Button
            //     key="submit"
            //     type="primary"
            //     onClick={() => {
            //         // form.validateFields()
            //         //     .then((values) => {
            //         //         onSubmit(values);
            //         //     })
            //         //     .catch((info) => {
            //         //         console.log("Validate Failed:", info);
            //         //     });
            //     }}
            // >
            //     Submit
            // </Button>
          ]
        }
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          // onFinish={handleSubmitimg}
        >
          {/* <Form.Item
            name="image"
            rules={[{ required: true, message: "Please Enter Human image" }]}
          > */}
            <Form.Item
              label={"Human image"}
              name="contract"
            >
              <Dragger
                // fileList={contractDocument}
                multiple={false}
                maxCount={1}
                onChange={(info) => checkImageType(info)}
                accept="image/*"
                // onRemove={handleRemoveImage}
              >
                <p className="ant-upload-drag-icon">
                  <DocumentUpload size="40" color="#707070" />
                </p>
              </Dragger>
            </Form.Item>
          {/* </Form.Item> */}
          {/* <div style={{ textAlign: "right" }}>
            <Button key="cancel" onClick={() => setVisibleimg(false)}>
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
          </div> */}
        </Form>
      </Modal>
    </>
  );
};

export default Work;
