import React, { useState, useEffect } from "react";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form, Table } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
import profileImage from '../assets/Profile.png'
/* ACTION CREATORS */
import { getUserDetails, updateUserProfile } from "../actions/userActions";

import { listMyOrders } from "../actions/orderActions";

/* ACTION TYPES */
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen({ history }) {
  /* STATE */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userDetails = useSelector((state) => state.userDetails);

  const { user, loading, error } = userDetails;

  /* WE NEED TO MAKE SURE USER IS LOGGED IN SO PULLING OUT USER LOGIN INFO */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  /* PULLING OUT SUCCESS FROM userUpdateProfile, IF SUCCESS IS TRUE WE WILL RESET STATE */
  const userUpdateProfle = useSelector((state) => state.userUpdateProfle);

  const { success } = userUpdateProfle;

  /* PULLING OUT USER ORDER DETAILS TO DISPLAY ON THE PAGE */
  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  /* SENDING USER TO LOGIN PAGE IF NOT LOGGED IN & SHOW PROFILE DATA IF LOGGED IN */
  useEffect(() => {
    // USER IS NOT LOGGED IN
    if (!userInfo) {
      history.push("/login");
    } else {
      // WE DON'T HAVE THE USER INFO SO WE DISPATCH AN ACTION TO GET THE DATA
      if (!user || !user.name || success || userInfo._id !== user._id) {
        /* (userInfo._id !== user._id) BECAUSE DURING USER EDIT STATE CHANGES SO WE WANT TO FIRE DISPATCH AGAIN HERE IF THE DATA ISN'T SAME AS THE USER AS WE ARE LOGGED IN  */
        // RESETTING PROFILE BEFORE FETCHING DATA SO THAT WE ALWAYS HAVE UPDATED DATA
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        // FETCHING USER DATA
        dispatch(getUserDetails("profile"));

        // FETCHING USER ORDER DETAILS
        dispatch(listMyOrders());
      } else {
        // WE HAVE THE USER INFO SO WE SET OUR STATE
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <main id="main" className="main">
  <div className="pagetitle">
    <h1>Profile</h1>
    {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
        <li className="breadcrumb-item">Users</li>
        <li className="breadcrumb-item active">Profile</li>
      </ol>
    </nav>
  </div>
  <section className="section profile">
    <div className="row">
      <div className="col-xl-4">
        <div className="card">
          <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
            <img src={profileImage} alt="Profile" className="rounded-circle" />
            <h2>{name}</h2>
            <h3>Master Member</h3>
            <div className="social-links mt-2">
              <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
              <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
              <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
              <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-8">
        <div className="card">
          <div className="card-body pt-3">
            {/* Bordered Tabs */}
            <ul className="nav nav-tabs nav-tabs-bordered">
             
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
              </li>
          
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">My Orders</button>
              </li>
            </ul>
            <div className="tab-content pt-2">
             
              <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                {/* Profile Edit Form */}
                <form onSubmit={submitHandler}>
                  <div className="row mb-3">
                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                    <div className="col-md-8 col-lg-9">
                      <img src={profileImage} alt="Profile" />
                     
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label  htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                    <div className="col-md-8 col-lg-9">
                      <input required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)} name="fullName"  className="form-control" id="fullName" defaultValue="Kevin Anderson" />
                    </div>
                  </div>
             
                  <div className="row mb-3">
                    <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Email</label>
                    <div className="col-md-8 col-lg-9">
                      <input required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} name="company" className="form-control" id="company" defaultValue="Lueilwitz, Wisoky and Leuschke" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Password</label>
                    <div className="col-md-8 col-lg-9">
                      <input type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}  className="form-control" id="Job" defaultValue="Web Designer" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Confirm Password</label>
                    <div className="col-md-8 col-lg-9">
                      <input type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} name="country" className="form-control" id="Country" defaultValue="USA" />
                    </div>
                  </div>
              
    
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>{/* End Profile Edit Form */}
              </div>
          
              <div className="tab-pane fade pt-3" id="profile-change-password">
                {/* Change Password Form */}
                <div className="col-12">
              <div className="card top-selling overflow-auto">
             
               
                <div className="card-body pb-0">
                  <h5 className="card-title">Orders <span>| List</span></h5>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Preview</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Price</th>
                     
                        
                      </tr>
                    </thead>
                    {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (

                <tbody >
               
                  {orders.map((order, index) => (

                    <tr key={index}>
                      
                      <th scope="row"><a href="#"><img src={order.image} alt /></a></th>
                      <td><a href="#" className="text-primary fw-bold">{order.name}</a></td>
                      <td>${order.totalPrice}</td>
                      <td>{order.createdAt ? order.createdAt.substring(0, 10) : null}</td>
                   
                    </tr>
                 
                    
                  
                  ))}
               </tbody>
              )}
                  </table>
                </div>
             
              </div>
            </div>{/* End Top Selling */}
              </div>
            </div>{/* End Bordered Tabs */}
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
  );
}

export default ProfileScreen;
