import React, { useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

/* COMPONENTS */
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { createOrder } from "../actions/orderActions";

/* ACTION TYPES */
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderCrate = useSelector((state) => state.orderCreate);

  const { order, error, success } = orderCrate;

  const cart = useSelector((state) => state.cart);

  // PRICE CALCULATIONS, WE ARE SETTING AN ATTRIBUTE TO OUR CART OBJECT BUT IT WON'T UPDATE OUR STATE, IT'S JUST FOR THIS PAGE
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  // REDIRECT
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  /* IF ORDER SUCCESSFULL AND WE HAVE ORDER ID, SEND USER TO USERS ACCOUNT TO VIEW THE ORDER */
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);

      // RESET STATE
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
    // eslint-disable-next-line
  }, [success, history]);

  // HANDLERS
  const placeorder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };


  return (
    <body>
<div>
  
 
  <main id="main" style={{marginLeft: "50px"}} className="main">
    <div className="pagetitle">
      <h1>Place Order</h1>
     
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
                      <h6>${cart.itemsPrice}</h6>
                      <button disabled={cart.cartItems === 0}
                  onClick={placeorder} type="button" className="btn btn-success">Place Order</button>
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
                <button disabled={cart.cartItems === 0}
                  onClick={placeorder} type="button" className="btn btn-success">Place Order</button>
              
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
                    {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (

                <tbody >
               
                  {cart.cartItems.map((item, index) => (
                    
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
                  <div className="activite-label">Street___________</div>
                  <i className="bi bi-circle-fill activity-badge text-success align-self-start" />
                  <div className="activity-content">
                  {cart.shippingAddress.address}, {" "}
                  </div>
                </div>{/* End activity item*/}
                <div className="activity-item d-flex">
                  <div className="activite-label">City_____________</div>
                  <i className="bi bi-circle-fill activity-badge text-danger align-self-start" />
                  <div className="activity-content">
                 {cart.shippingAddress.city},{" "}
             
                  </div>
                </div>{/* End activity item*/}
               
                <div className="activity-item d-flex">
                  <div className="activite-label">Phone Number___</div>
                  <i className="bi bi-circle-fill activity-badge text-info align-self-start" />
                  <div className="activity-content">
                      {cart.shippingAddress.postalCode},{" "}
                  </div>
                </div>{/* End activity item*/}
              
                <div className="activity-item d-flex">
                  <div className="activite-label">Extra Info________</div>
                  <i className="bi bi-circle-fill activity-badge text-muted align-self-start" />
                  <div className="activity-content">
                  {cart.shippingAddress.country}, {" "}
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

export default PlaceOrderScreen;
