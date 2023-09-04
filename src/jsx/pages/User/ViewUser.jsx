import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Card, Col, Badge } from "react-bootstrap";
import dummy from "../../../images/dummy.png";
import UserService from "../../../services/user";
import { useDispatch } from "react-redux";

const ViewUser = () => {
  const { state } = useLocation();
  const userDetail = state?.userDetail;
  const dispatch = useDispatch();
  const [sharedPost, setSharedPost] = useState([]);
  const [savedPost, setSavedPost] = useState([]);

  const getSharedPost = () => {
    dispatch(UserService.getSharedPostList(userDetail?.id))
      .then((res) => {
        if (res.data.length !== 0) {
          setSharedPost(res.data.posts)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getSavedPost = () => {
    dispatch(UserService.getSavedPostList(userDetail?.id))
      .then((res) => {
        if (res.data.length !== 0) {
          setSavedPost(res.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getSharedPost();
    getSavedPost();
  }, [userDetail]);

  return (
    <>
      <Row>
        <Col xl="6">
          <div className="custome_card bg-dark text-white mb-4">
            <div class="row gy-4">
              <div class="col-md-12 col-lg-4">
                <div class="img_wrapper_h100">
                  <img src={userDetail?.img ? process.env.REACT_APP_PROFILE_URL + 'users/' + userDetail?.img : dummy} class="imaga_fluid" alt="" />
                </div>
              </div>
              <div class="col-md-12 col-lg-4">
                <div class="text_content">
                  <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-user" aria-hidden="true"></i> &nbsp; {userDetail?.firstName ? userDetail?.firstName + ' ' + userDetail?.lastName : '-'}</p>
                  <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp; {userDetail?.email ? userDetail?.email : '-'}</p>
                  <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-phone-square" aria-hidden="true"></i> &nbsp; {userDetail?.mobile ? userDetail?.mobile : '-'}</p>
                  <p className="fs16 fw-400 lh-lg mb-2"> <i className="fa fa-id-card" aria-hidden="true"></i>{userDetail?.is_subscription ? (userDetail?.is_subscription === 0 ? <Badge bg=" badge-lg " className='badge bg-dark' style={{ cursor: 'pointer' }} >Is not subscribe</Badge> : <Badge bg=" badge-lg " className='badge bg-dark' style={{ cursor: 'pointer' }} >Is subscribe</Badge>) : <Badge bg=" badge-lg " className='badge bg-dark' style={{ cursor: 'pointer' }} >Is not subscribe</Badge>}</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl="6">
          <Card>
            <Card.Header className=" border-0 pb-0">
              <Card.Title>Shared Post</Card.Title>
            </Card.Header>
            <Card.Body>
              {
                sharedPost.length !== 0 ? sharedPost.map((post, key) => {
                  return (
                    <div key={key}>
                      <img src={process.env.REACT_APP_PROFILE_URL + 'posts/' + post.image} width={150} height={150} class="imaga_fluid" alt="" />
                    </div>
                  )
                }) : 'No Post'
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl="6">
          <Card>
            <Card.Header className=" border-0 pb-0">
              <Card.Title>Saved Post</Card.Title>
            </Card.Header>
            <Card.Body>
              {
                savedPost.length !== 0 ? savedPost.map((post, key) => {
                  return (
                    <div key={key}>
                      <img src={process.env.REACT_APP_PROFILE_URL + 'posts/' + post.image} width={150} height={150} class="imaga_fluid" alt="" />
                    </div>
                  )
                }) : 'No Post'
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewUser;
