import React, { useEffect } from "react";
import img1 from '../assets/shop.jpg'

/* REACT-BOOTSTRAP */
import { Row, Col, Link } from "react-bootstrap";
import SearchBox from "../components/Searchboxes";
/* COMPONENTS */
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProducts } from "../actions/productActions";
function Shop({ history }) {
    const dispatch = useDispatch();

    /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
    const productList = useSelector((state) => state.productList);
    const { products, page, pages, loading, error } = productList;
  
    /* FIRING OFF THE ACTION CREATORS USING DISPATCH */
  
    let keyword =
      history.location
        .search; /* IF USER SEARCHES FOR ANYTHING THEN THIS KEYWORD CHANGES AND USE EFFECT GETS TRIGGERED */
  
    useEffect(() => {
      dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    
  return (
<div style={{ marginTop : "55px" }}>
<section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: `url(${img1})`, height: "300px"}}>
    <h2 style={{color: "rgb(255, 204, 0)"}} className="ltext-105 cl0 txt-center">
     Master Shop
    </h2>
  </section>
{/* Product */}
<div className="bg0 m-t-23 p-b-140">
  <div className="container">
    <div className="flex-w flex-sb-m p-b-52">
      <div className="flex-w flex-l-m filter-tope-group m-tb-10">
        <button className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">
          All Products
        </button>
        
      </div>
      <div className="flex-w flex-c-m m-tb-10">
        <div className="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
          <i className="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list" />
          <i className="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
          Filter
        </div>
        <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
          <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search" />
          <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
          Search
        </div>
      </div>
      {/* Search product */}
      <div className="dis-none panel-search w-full p-t-10 p-b-15">
        <div className="bor8 dis-flex p-l-15">
          <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
            <i className="zmdi zmdi-search" />
          </button>
          <input className="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Search" />
        </div>	
      </div>
     
    </div>
    

    {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <div className="row isotope-grid">

          {products.map((product) => {
              return (
               
                  <Product product={product} />
                
              );
            })}

       
      </div>

          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
        


      

      
    
    </div>
    {/* Load more */}
    <div className="flex-c-m flex-w w-full p-t-45">
      <a href="#" className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04">
        Load More
      </a>
    </div>
  </div>
</div>



  )
}

export default Shop