import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { getUserDetails, updateUser } from "../actions/userActions";

/* ACTION TYPES */
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen({ match, history }) {
  /* GETTING USER ID FROM URL */
  const userId = match.params.id;

  /* STATE */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    /* IF USER SUCCESSFULLY UPDATED, RESET USER DETAILS & REDIRECT USER TO ADMIN PAGE */
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      /* IF WE DON'T HAVE A USER, OR IF WE HAVE DATA LOADED IN BUT WE ARE EDITING SOME OTHER USER THEN WE DISPATCH AND GET DATA OF THAT USER */
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, history, successUpdate]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <body style={{ marginTop : "55px" }}>

    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Form Elements</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Forms</li>
            <li className="breadcrumb-item active">Elements</li>
          </ol>
        </nav>
      </div>{/* End Page Title */}
      <section className="section">
        <div className="row">
          <div className="col-lg-6">
            <div style={{ width: "700px"}} className="card">
              <div  className="card-body">
                <h5 className="card-title">General Form Elements</h5>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)} className="form-control" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Update</button>
                  </div>
                </div>
              </form>
          

         

        )}
 </div>
          </div>
        </div>
     
      </div>
    </section>
  </main>
</body>
  );
}

export default UserEditScreen;
