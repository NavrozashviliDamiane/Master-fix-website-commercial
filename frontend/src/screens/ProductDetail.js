import React, { useEffect, useState } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

/* COMPONENTS */
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductDetail({ match, history }) {
   /* STATE */
   const [qty, setQty] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
 
   const dispatch = useDispatch();
 
   /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
   const productDetails = useSelector((state) => state.productDetails);
   const { product, loading, error } = productDetails;
 
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;
 
   const productReviewCreate = useSelector((state) => state.productReviewCreate);
   const {
     success: successProductReview,
     loading: loadingProductReview,
     error: errorProdcutReview,
   } = productReviewCreate;

 /* style */
   const mystyle = {
    backgroundColor: 'lightblue',
    height: "50px",
    color: "black",
  };
 
   /* FIRING OFF THE ACTION CREATORS USING DISPATCH */
 
   useEffect(() => {
     // IF REVIEW SUCCESSFULLY SUBMITTED, RESET
     if (successProductReview) {
       setRating(0);
       setComment("");
       dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
     }
 
     dispatch(listProductDetails(match.params.id));
   }, [dispatch, match, successProductReview]);
 
   const addToCartHandler = () => {
     history.push(`/cart/${match.params.id}?qty=${qty}`);
   };
 
   /* HANDLERS */
   const submitHandler = (e) => {
     e.preventDefault();
 
     dispatch(createProductReview(match.params.id, { rating, comment }));
   };


  return (
    <div style={{ marginTop: "150px" }}>
      {/* breadcrumb */}
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <a href="product.html" className="stext-109 cl8 hov-cl1 trans-04">
            Men
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <span className="stext-109 cl4">Lightweight Jacket</span>
        </div>
      </div>
      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-7 p-b-30">
                <div className="p-l-25 p-r-30 p-lr-0-lg">
                  <div className="wrap-slick3 flex-sb flex-w">
                    <div className="wrap-slick3-dots" />
                    <div className="wrap-slick3-arrows flex-sb-m flex-w" />
                    <div className="slick3 gallery-lb">
                      <div
                        className="item-slick3"
                        data-thumb="images/product-detail-01.jpg"
                      >
                        <div className="wrap-pic-w pos-relative">
                          <img src={product.image} alt="IMG-PRODUCT" />
                          <a
                            className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                            href="images/product-detail-01.jpg"
                          >
                            <i className="fa fa-expand" />
                          </a>
                        </div>
                      </div>

                      <div
                        className="item-slick3"
                        data-thumb="images/product-detail-03.jpg"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-5 p-b-30">
                <div className="p-r-50 p-t-5 p-lr-0-lg">
                  <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                    {product.name}
                  </h4>
                  <span className="mtext-106 cl2">${product.price}</span>
                  <p className="stext-102 cl3 p-t-23"></p>
                  {/*  */}

                  <div className="p-t-33">
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Status</div>
                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                          <div className="dropDownSelect2" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Quantity</div>
                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          {product.countInStock > 0 && (
                            <select
                              className="js-select2"
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              name="time"
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          )}

                          <div className="dropDownSelect2" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-203 flex-c-m respon6">Raiting</div>
                      <div className="size-204 respon6-next">
                        <div className="rs1-select2 bor8 bg0">
                          <ListGroup.Item>
                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                              color={"#f8e825"}
                            />
                          </ListGroup.Item>
                          <div className="dropDownSelect2" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-w flex-r-m p-b-10">
                      <div className="size-204 flex-w flex-m respon6-next">
                        <button
                          className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                          disabled={product.countInStock === 0}
                          type="button"
                          onClick={addToCartHandler}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                    <div className="flex-m bor9 p-r-10 m-r-11">
                      <a
                        href="#"
                        className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                        data-tooltip="Add to Wishlist"
                      >
                        <i className="zmdi zmdi-favorite" />
                      </a>
                    </div>
                    <a
                      href="#"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                      data-tooltip="Facebook"
                    >
                      <i className="fa fa-facebook" />
                    </a>
                    <a
                      href="#"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                      data-tooltip="Twitter"
                    >
                      <i className="fa fa-twitter" />
                    </a>
                    <a
                      href="#"
                      className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                      data-tooltip="Google Plus"
                    >
                      <i className="fa fa-google-plus" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bor10 m-t-50 p-t-43 p-b-40">
              {/* Tab01 */}
              <div className="tab01">
                {/* Nav tabs */}
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item p-b-10">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#description"
                      role="tab"
                    >
                      Description
                    </a>
                  </li>

                  <li className="nav-item p-b-10">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#reviews"
                      role="tab"
                    >
                      Reviews (1)
                    </a>
                  </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content p-t-43">
                  {/* - */}
                  <div
                    className="tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                  >
                    <div className="how-pos2 p-lr-15-md">
                      <p className="stext-102 cl6">{product.description}</p>
                    </div>
                  </div>

                  <div className="tab-pane " id="reviews" role="tabpanel">
                    <div className="row">
                      <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                        <div className="p-b-30 m-lr-15-sm">
                          {/* Review */}
                          
                            {product.reviews.length === 0 && (
                              <Message variant="info">No Reviews</Message>
                            )}

                            {product.reviews.map((review) => (
                          <div className="flex-w flex-t p-b-68" key={review._id}>
                            <div className="size-207">
                              <div className="flex-w flex-sb-m p-b-17">
                                <span className="mtext-107 cl2 p-r-20">
                                  <strong>{review.comment}</strong>
                                </span>
                                <span className="fs-18 cl11">
                                <Rating value={review.rating} color="f8e825" />
                                </span>
                              </div>
                              <p className="stext-102 cl6">
                              {review.name} <p>{review.createdAt.substring(0, 10)}</p>
                              </p>
                            </div>
                                

                          
                              </div>
                            ))}
                            
                      

                          {/* Add review */}
                          <div className="w-full">
                            <h5 className="mtext-108 cl2 p-b-7">
                              Add a review
                            </h5>

                            {loadingProductReview && <Loader />}
                    {successProductReview && (
                      <Message variant="success">Review Submitted</Message>
                    )}
                    {errorProdcutReview && (
                      <Message variant="danger">{errorProdcutReview}</Message>
                    )}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>

                          <Form.Control
                            style = {mystyle}
                            as="select"
                            value={rating}
                            
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option style={{color: "black" }} value="">Select...</option>
                            <option style={{color: "black" }} value="1">1 - Poor</option>
                            <option style={{color: "black" }} value="2">2 - Fair</option>
                            <option style={{color: "black" }} value="3">3 - Good</option>
                            <option style={{color: "black" }} value="4">4 - Very Good</option>
                            <option style={{color: "black" }} value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment">
                          <Form.Label>Review</Form.Label>

                          <textarea
                          className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                          style = {{backgroundColor: 'lightblue',}}
                            as="textarea"
                            row="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>

                        <button
                          disabled={loadingProductReview}
                          type="submit"
                          className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10"
                        
                        >
                          Submit
                        </button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        Please <Link to="/login">Login</Link> to write a review.
                      </Message>
                    )}


                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        )}
      </section>

    
   
   
    </div>
  );
}



export default ProductDetail