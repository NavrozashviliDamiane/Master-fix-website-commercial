import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { saveShippingAddress } from "../actions/cartActions";
import img1 from '../assets/address.jpg'



function ShippingScreenS({ history }) {
    // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  // STATE
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  // HANDLERS
  const submitHandler = (e) => {
    e.preventDefault();

    /* FIRING OFF THE ACTION CREATORS USING DISPATCH TO SAVE ADDRESS */
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );

    // PUSHING USER TO PAYMENTS PAGE AFTER SAVING ADDRESS
    history.push("./payment");
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
            <div className="col-lg-6 d-none d-lg-block bg "><img src={img1} style={{objectFit: 'cover'}} /></div>
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 style={{color: "#1FDFDB"}} className="h4  mb-4">Shipping Address!</h1>
                </div>
                

                <form className="user" onSubmit={submitHandler}>

                  <div className="form-group">
                  <input required type="text" value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)} className="form-control form-control-user" id="exampleFirstName" placeholder="Residential Address: street, ...." />
                  </div>

                  

                  <div className="form-group">

                 <input required value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)} type="text" className="form-control form-control-user" id="exampleInputEmail" placeholder="Enter City" />

                  </div>

                  <div className="form-group">

                    <input type="text" 
                    required
                    value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
                    className="form-control form-control-user" id="exampleInputPassword" placeholder="Phone Number" />
                  </div>

                  <div className="form-group">
                  <input type="text" 
                    required
                    value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
                    className="form-control form-control-user" id="exampleInputPassword" placeholder="Extra Details" />
                  </div>


                  <button style={{backgroundColor: "#1FDFDB"}} type="submit"  className="btn btn-primary btn-user btn-block">
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
  )
}

export default ShippingScreenS