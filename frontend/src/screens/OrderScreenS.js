import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";

/* PAYPAL BUTTONS */
import { PayPalButton } from "react-paypal-button-v2";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";

/* ACTION TYPES */
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

function OrderScreen({ history, match }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // ITEMS PRICE GETS CALCULATED ONLY IF WE HAVE AN ORDER
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

// PAYPAL BUTTONS
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // IS USER IS NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE
    if (!userInfo) {
      history.push("/login");
    }

    // CHECK IF WE HAVE THE ORDER DETAILS, IF NOT DISPATCH AN ACTION TO GET THE ORDER DETAILS
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      // ACTIVATING PAYPAL SCRIPTS
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

  /* HANDLERS */
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (

    <body>
    <div>
      
     
      <main id="main" style={{marginLeft: "50px"}} className="main">
        <div className="pagetitle">
          <h1>Order: N{order._id}</h1>
         
        </div>{/* End Page Title */}
        <section className="section dashboard">
          <div className="row">
            {/* Left side columns */}
            <div className="col-lg-8">
              <div className="row">
                {/* Sales Card */}
              
                {/* Revenue Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                  
                     
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Order Total Price</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar" />
                        </div>
                        <div className="ps-3">
                          <h6>${order.itemsPrice}</h6>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* End Revenue Card */}
           {/* Revenue Card */}
         
    
                {/* Reports */}
                <div className="col-12">
                  <div className="card">
                  
                 
                  </div>
                </div>{/* End Reports */}
                {/* Recent Sales */}
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>
                   
                  
                  </div>
                </div>{/* End Recent Sales */}
                {/* Top Selling */}
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
                            
                          </tr>
                        </thead>
                        {order.orderItems.length === 0 ? (
                    <Message variant="info">Your cart is empty</Message>
                  ) : (
    
                    <tbody >
                   
                      {order.orderItems.map((item, index) => (
                        
                        <tr key={index}>
                          <th scope="row"><a href="#"><img src={item.image} alt /></a></th>
                          <td><a href="#" className="text-primary fw-bold">{item.name}</a></td>
                          <td>{item.qty} X ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}</td>
                       
                        </tr>
                     
                        
                      
                      ))}
                   </tbody>
                  )}
                      </table>
                    </div>
                 
                  </div>
                </div>{/* End Top Selling */}
              </div>
            </div>{/* End Left side columns */}
            {/* Right side columns */}
            <div className="col-lg-4">
              {/* Recent Activity */}
              <div className="card">
          
                <div className="card-body">
                  <h5 className="card-title"> Shipping Address </h5>
                  <div className="activity">
                    <div className="activity-item d-flex">
                      <div className="activite-label">Email___________</div>
                      <i className="bi bi-circle-fill activity-badge text-success align-self-start" />
                      <div className="activity-content">
                      {order.User.email} {" "}
                      </div>
                    </div>{/* End activity item*/}
                    <div className="activity-item d-flex">
                      <div className="activite-label">Name_____________</div>
                      <i className="bi bi-circle-fill activity-badge text-danger align-self-start" />
                      <div className="activity-content">
                      {order.User.name},{" "}
                 
                      </div>
                    </div>{/* End activity item*/}
                   
                    <div className="activity-item d-flex">
                      <div className="activite-label">Phone Number___</div>
                      <i className="bi bi-circle-fill activity-badge text-info align-self-start" />
                      <div className="activity-content">
                      {order.shippingAddress.postalCode},{" "}
                      </div>
                    </div>{/* End activity item*/}
                  
                    <div className="activity-item d-flex">
                      <div className="activite-label">City________</div>
                      <i className="bi bi-circle-fill activity-badge text-muted align-self-start" />
                      <div className="activity-content">
                      {order.shippingAddress.city},{" "}
                      </div>
                    </div>{/* End activity item*/}

                    <div className="activity-item d-flex">
                      <div className="activite-label">Address________</div>
                      <i className="bi bi-circle-fill activity-badge text-muted align-self-start" />
                      <div className="activity-content">
                      {order.shippingAddress.address},{" "}
                      </div>
                    </div>{/* End activity item*/}

                    <div className="activity-item d-flex">
                      <div className="activite-label">Extra Info________</div>
                      <i className="bi bi-circle-fill activity-badge text-muted align-self-start" />
                      <div className="activity-content">
                      {order.shippingAddress.country},{" "}
                      </div>
                    </div>{/* End activity item*/}
                  </div>
                </div>
              </div>{/* End Recent Activity */}
             
          
       
            </div>{/* End Right side columns */}
          </div>
        </section>
      </main>{/* End #main */}
    
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
    </div>
    
      
      </body>
  );
}

export default OrderScreen;
