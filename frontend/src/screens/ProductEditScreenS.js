import React, { useState, useEffect } from "react";

/* AXIOS */
import axios from "axios";

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
import { listProductDetails, updateProduct } from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen({ match, history }) {
  /* GETTING USER ID FROM URL */
  const productId = match.params.id;

  /* STATE */
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    // CHECK IF PRODUCT WAS UDPATED
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    // DISPATCH TO UDPATE PRODUCT
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
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
              {/* General Form Elements */}
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
                  <label htmlFor="inputNumber" className="col-sm-2 col-form-label">Price</label>
                  <div className="col-sm-10">
                    <input type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)} className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputNumber" className="col-sm-2 col-form-label">Upload Image</label>
                  <div className="col-sm-10">
                    <input className="form-control" type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)} />
                  </div>
                  <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Brand</label>
                  <div className="col-sm-10">
                    <input type="text"
                placeholder="Enter Brand" className="form-control"
                value={brand}
                onChange={(e) => setBrand(e.target.value)} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Stock</label>
                  <div className="col-sm-10">
                    <input type="number"
                placeholder="Enter Stock" className="form-control"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputText" className="col-sm-2 col-form-label">Category</label>
                  <div className="col-sm-10">
                    <input type="text"
                placeholder="Enter Category" className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)} />
                  </div>
                </div>

        
                <div className="row mb-3">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} style={{height: 100}} defaultValue={""} />
                  </div>
                </div>
           
           
          
                <div className="row mb-3">
                
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Update</button>
                  </div>
                </div>
              </form>  )}{/* End General Form Elements */}
            </div>
          </div>
        </div>
     
      </div>
    </section>
  </main>
</body>

  );
}

export default ProductEditScreen;



