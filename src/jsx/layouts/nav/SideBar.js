/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from './Logout';
import dummy from "../../../images/dummy.png";
// const Userservice from "../"


/// Image
//import user from "../../../images/user.jpg";
import { connect, useDispatch } from "react-redux";



class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  render() {

    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = (props) => {
  const adminData = props?.adminData;
  const dispatch = useDispatch();
  const [users, setUser] = useState();
  // const data = useParams();
  const path = useLocation();
  // console.log(path.pathname);

  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);

  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    // var handleheartBlast = document.querySelector('.heart');
    // function heartBlast() {
    //   return handleheartBlast.classList.toggle("heart-blast");
    // }
    // handleheartBlast.addEventListener('click', heartBlast);

  }, []);
  // let scrollPosition = useScrollPosition();
  /// Path
  // let path = window.location.pathname;
  // path = path.split("/");
  // path = path[path.length - 1];
  let deshBoard = [
    "",
    "dashboard",
    "dashboard-dark",
    "wallet",
    "invoices-list",
    "create-invoices",
    "card-center",
    "transaction-details",
    "task",
    "post-report",
    "user-report"
  ],
    user = [
      "user-list",
      "broker-list",
      'user-detail'
    ],
    notification = [
      "general-notification",
    ];
  const [isMenuActiv, setIsMenuActiv] = useState();
  const sidebarbtn = (e) => {
    setIsMenuActiv(e);
  }

  let profileImage = `${process.env.REACT_APP_PROFILE_URL + 'admin/'}${adminData?.profileImage}`
  return (
    <div
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        // ? scrollPosition > 120
        //   ? "fixed"
        //   : ""
        // : ""
        }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown className="dropdown header-profile2">
          <Dropdown.Toggle variant="" as="a" className="nav-link i-false c-pointer">
            <div className="header-info2 d-flex align-items-center border">
              <img src={adminData?.profileImage != null ? profileImage : dummy} width={20} alt="" loading="lazy" className="object-fit-cover" />
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <span className="font-w700 d-block mb-2">{adminData?.displayName}</span>
                  <small className="text-end font-w400">Super Admin</small>
                </div>
                <i className="fas fa-sort-down ms-4"></i>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className=" dropdown-menu dropdown-menu-end">
            <Link to="/app-profile" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile </span>
            </Link>
            <Link to="/change-password" className="dropdown-item ai-icon">
              <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary me-1"
                width={18} height={18} viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20M11.02 19.5H7.5c-.62 0-1.17-.02-1.66-.09-2.63-.29-3.34-1.53-3.34-4.91v-5c0-3.38.71-4.62 3.34-4.91.49-.07 1.04-.09 1.66-.09h3.46M15.02 4.5h1.48c.62 0 1.17.02 1.66.09 2.63.29 3.34 1.53 3.34 4.91v5c0 3.38-.71 4.62-3.34 4.91-.49.07-1.04.09-1.66.09h-1.48M15 2v20" />
                <circle cx={12} cy={15} r={4} />
              </svg>
              <span className="ms-2">Change Password</span>
            </Link>
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) || path.pathname === '/' || isMenuActiv === 1 ? "mm-active" : ""}`} onClick={() => sidebarbtn(1)}>
            <Link to="/" >
              <i className="fas fa-home icon_class"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className={`${user.includes(path) || path.pathname === '/user-list' || isMenuActiv === 2 ? "mm-active" : ""}`} onClick={() => sidebarbtn(2)}>
            <Link to="/user-list">
              {/* <Link className="has-arrow ai-icon" to="#" > */}
              <i className="fa fa-user icon_class"></i>
              <span className="nav-text">User List</span>
            </Link>

          </li>
          <li className={`${path.pathname === "/tutorials" || path.pathname === "/tutorials" || isMenuActiv === 3 ? "mm-active" : ""}`} onClick={() => sidebarbtn(3)}>
            <Link to="/tutorials" >
              <i className="fa fa-list icon_class"></i>
              <span className="nav-text">Tutorials</span>
            </Link>
          </li>
          <li className={`${path === "hunter-tip" || path.pathname === "/hunter-tip" || isMenuActiv === 4 ? "mm-active" : ""}`} onClick={() => sidebarbtn(4)}>
            <Link to="/hunter-tip" >
              <i className="fa fa-lightbulb icon_class"></i>
              <span className="nav-text">Hunter Tip</span>
            </Link>
          </li>
          {/* <li className={`${path === "states" || path.pathname === "/states" ? "mm-active" : ""}`}>
            <Link to="/states" >
              <i className="fa fa-star"></i>
              <span className="nav-text">States</span>
            </Link>
          </li> */}
          {/* <li className={`${path === "rifle-seasons" || path.pathname === "/rifle-seasons" ? "mm-active" : ""}`}>
            <Link to="/rifle-seasons" >
              <i className="fa fa-star"></i>
              <span className="nav-text">Rifle Seasons</span>
            </Link>
          </li> */}
          <li className={`${path.pathname === "/support-tickets" || path.pathname === "/support-tickets" || isMenuActiv === 5 ? "mm-active" : ""}`} onClick={() => sidebarbtn(5)}>
            <Link to="/support-tickets" >
              <i className="fa fa-envelope icon_class"></i>
              <span className="nav-text">Support Tickets</span>
            </Link>
          </li>
          {/* <li className={`${path === "late-season" || path.pathname === "/late-season" ? "mm-active" : ""}`}>
            <Link to="/late-season" >
            <i className="fa fa-lightbulb"></i>
              <span className="nav-text">Late season</span>
            </Link>
          </li> */}
          <li className={`${deshBoard.includes(path) || isMenuActiv === 6 ? "mm-active" : ""}`} onClick={() => sidebarbtn(6)}>
            <Link className="has-arrow ai-icon" to="#" aria-expanded={isMenuActiv === 6 ? "true" : "false"} >
              <i className="fa fa-star icon_class" aria-hidden="true"></i>
              <span className="nav-text">Manage State Info</span>
            </Link>
            <ul className={`${isMenuActiv === 6 ? 'mm-show' : ""} mm-collapse`}>
              <li><Link className={`${path === "states" ? "mm-active" : ""}`} to="/states">States</Link></li>
              <li><Link className={`${path === "transaction" ? "mm-active" : ""}`} to="/seasons">Seasons</Link></li>
              <li><Link className={`${path === "transaction" ? "mm-active" : ""}`} to="/dates">Dates</Link></li>
            </ul>
          </li>
          <li className={`${deshBoard.includes(path) || isMenuActiv === 7 ? "mm-active" : ""}`} onClick={() => sidebarbtn(7)}>
            <Link className="has-arrow ai-icon" to="#" aria-expanded={isMenuActiv === 7 ? "true" : "false"}>
              <i className="fa fa-user-plus icon_class" aria-expanded="true"></i>
              <span className="nav-text">Subscriptions</span>
            </Link>
            <ul className={`${isMenuActiv === 7 ? 'mm-show' : ""} mm-collapse`}>
              <li><Link className={`${path === "subscribed-users" ? "mm-active" : ""}`} to="/subscribed-users">Subscribed Users</Link></li>
              <li><Link className={`${path === "transaction" ? "mm-active" : ""}`} to="/transaction">Transaction</Link></li>

            </ul>
          </li>
          <li className={`${deshBoard.includes(path) || isMenuActiv === 8 ? "mm-active" : ""}`} onClick={() => sidebarbtn(8)}>
            <Link className="has-arrow ai-icon" to="#" aria-expanded={isMenuActiv === 8 ? "true" : "false"}>
              <i className="fa fa-flag icon_class" aria-expanded="true" ></i>
              <span className="nav-text">Report</span>
            </Link>
            <ul className={`${isMenuActiv === 8 ? 'mm-show' : ""} mm-collapse`}>
              <li><Link className={`${path === "post-report" ? "mm-active" : ""}`} to="/post-report">Post Report</Link></li>
              <li><Link className={`${path === "user-report" ? "mm-active" : ""}`} to="/user-report">User Report</Link></li>

            </ul>
          </li>
          <li onClick={() => sidebarbtn(9)} className={`${deshBoard.includes(path) || isMenuActiv === 9 ? "mm-active" : ""}`}>
            <Link className="has-arrow ai-icon" to="#" aria-expanded={isMenuActiv === 9 ? "true" : "false"}>
              <i className="fa fa-bell icon_class" aria-expanded="true"></i>
              <span className="nav-text">Notifications</span>
            </Link>
            <ul className={`${isMenuActiv === 9 ? 'mm-show' : ""} mm-collapse`}>
              <li><Link className={`${path === "general-notification" || isMenuActiv === 9 ? "mm-active" : ""}`} to="/general-notification">General Notification</Link></li>
            </ul>
          </li>
          <li className={`${deshBoard.includes(path) || isMenuActiv === 10 ? "mm-active" : ""}`} onClick={() => sidebarbtn(10)}>
            <Link className="has-arrow ai-icon" to="#" aria-expanded={isMenuActiv === 10 ? "true" : "false"}>
              <i className="fa fa-cog icon_class" aria-expanded="true"></i>
              <span className="nav-text">Settings</span>
            </Link>
            <ul className={`${isMenuActiv === 10 ? 'mm-show' : ""} mm-collapse`}>
              <li><Link className={`${path === "how-it-work" ? "mm-active" : ""}`} to="/how-it-work">How it Work</Link></li>
              <li><Link className={`${path === "techniques-guide" ? "mm-active" : ""}`} to="/techniques-guide">Techniques Guide</Link></li>
              <li><Link className={`${path === "contact-us" ? "mm-active" : ""}`} to="/contact-us">Contact us</Link></li>
              <li><Link className={`${path === "about-us" ? "mm-active" : ""}`} to="/about-us">About Us</Link></li>
              <li><Link className={`${path === "cms" ? "mm-active" : ""}`} to="/cms">CMS</Link></li>
              <li><Link className={`${path === "promocode" ? "mm-active" : ""}`} to="/promocode">PromoCode</Link></li>
            </ul>
          </li>
        </MM>
      </PerfectScrollbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    adminData: state.auth.auth
  };
};
export default connect(mapStateToProps)(SideBar);
