import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form, Col } from "react-bootstrap";

/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import img1 from '../assets/payment.jpg'


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  // STATE
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  /* IF NO SHIPPING ADDRESS THEN REDIRECT TO ShippingAddress SCREEN */
  if (!shippingAddress.address) {
    history.push("./shipping");
  }

  // HANDLERS

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    // AFTER CHOSING THE PAYMENT METHOD REDIRECT USER TO PlaceOrder SCREEN
    history.push("/placeorder");
  };

  return (
    <body className='bg-gradient-primary'>
    <div style={{ marginTop : "100px",  }} className="container">
  {/* Outer Row */}
  

  <div className="row justify-content-center">
  
    <div className="col-xl-10 col-lg-12 col-md-9">
       
      <div className="card o-hidden border-0 shadow-lg my-5"> 
      <CheckoutSteps step1 step2 />
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg " ><img src={img1} style={{objectFit: 'cover'}} /></div>
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 style={{color: "#1FDFDB"}} className="h4  mb-4">Payment Method</h1>
                </div>
                

                <form className="user" onSubmit={submitHandler}>
                <Form.Group>
          <Form.Label as="legend"></Form.Label>
          <Col>
            <Form.Check style={{backgroundColor: "#1FDFDB", color: "white" }}
              type="radio"
              label="By Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check style={{backgroundColor: "#1FDFDB", marginTop : "20px", color: "white" }}
              type="radio"
              label="Cash"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

            

                  <button style={{backgroundColor: "#1FDFDB", marginTop : "60px", }} type="submit"  className="btn btn-primary btn-user btn-block">
                   <strong>Continue</strong> 
                  </button>
                  <hr />
                        
                </form>
                <hr />
            
                <div style={{ marginTop : "15px",  }} className="text-center">
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
   
  );
}

export default PaymentScreen;

