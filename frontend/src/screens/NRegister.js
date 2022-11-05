import React, { useState, useEffect } from 'react'
import img1 from '../assets/difficult.jpg'

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import background from '../assets/grant.jpg'
/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { register } from "../actions/userActions";


function Register({ location, history }) {

   /* STATE */
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setpassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState("");
 
   const dispatch = useDispatch();
 
   /* SETTING UP REDIRECT */
   const redirect = location.search ? location.search.split("=")[1] : "/";
 
   /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
   const userRegister = useSelector((state) => state.userRegister);
 
   const { userInfo, loading, error } = userRegister;
 
   /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
   useEffect(() => {
     if (userInfo) {
       history.push(redirect);
     }
   }, [history, userInfo, redirect]);
 
   /* HANDLERS */
 
   const submitHandler = (e) => {
     e.preventDefault();
 
     /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
     if (password !== confirmPassword) {
       setMessage("Passwords do not match");
     } else {
       /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR REGISTER */
       dispatch(register(name, email, password));
     }
   };
 


  return (
    <body className='bg-gradient-primary'>
    <div style={{ marginTop : "100px",  }} className="container">
  {/* Outer Row */}
  
  {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}



  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg " ><img src={img1} style={{objectFit: 'cover'}} /></div>
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 style={{color: "#1FDFDB"}} className="h4  mb-4">Become Master Member!</h1>
                </div>
                {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <form className="user" onSubmit={submitHandler}>

                  <div className="form-group">
                  <input required type="text" value={name}
            onChange={(e) => setName(e.target.value)} className="form-control form-control-user" id="exampleFirstName" placeholder="First Name" />
                  </div>

                  

                  <div className="form-group">

                 <input required value={email}
            onChange={(e) => setEmail(e.target.value)} type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />

                  </div>

                  <div className="form-group">

                    <input type="password" 
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                  </div>

                  <div className="form-group">
                  <input type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                  </div>


                  <button style={{backgroundColor: "#1FDFDB"}} type="submit"  className="btn btn-primary btn-user btn-block">
                   <strong>Register</strong> 
                  </button>
                  <hr />
                        
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" >Already have an account?</a>
                </div>
                <div style={{ marginTop : "15px",  }} className="text-center">
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                <button style={{backgroundColor: "#1FDFDB", borderRadius: '20px'}}   className="btn btn-primary btn-user btn-block">
                   <strong>Login</strong> 
                  </button>
                  </Link>
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

export default Register