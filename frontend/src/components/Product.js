import React from "react";

/* REACT-BOOTSTRAP */
import { Card } from "react-bootstrap";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* COMPONENTS */
import Rating from "./Rating";

function Product({ product }) {
  return (
    
    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
       
    <div className="block2">
      <div className="block2-pic hov-img0">
      <Link to={`/product/${product._id}`}> <img src={product.image} alt="IMG-PRODUCT" /></Link>
      <Link to={`/product/${product._id}`}><a  className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
          Quick View
        </a> </Link>
      </div>
      <div className="block2-txt flex-w flex-t p-t-14">
        <div className="block2-txt-child1 flex-col-l ">
        <Link to={`/product/${product._id}`}> <a  className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
          <strong>{product.name}</strong>
          </a></Link>
          <span className="stext-105 cl3">
            ${product.price}
          </span>
        </div>
       
      </div>
    </div>
  </div>
  );
}

export default Product;
