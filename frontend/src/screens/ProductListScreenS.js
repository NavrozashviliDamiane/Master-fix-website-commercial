import React, { useEffect } from "react";
import './productlist.css'

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT BOOTSTRAP */
import { Table, Button, Row, Col } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen({ match, history }) {
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const productList = useSelector((state) => state.productList);
  const { products, pages, page, loading, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    product: createdProduct,
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // GETTING PAGE NUMBER (KEYWORD IS PAGE NUMBER)
  let keyword = history.location.search;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    // CHECK IF PRODUCT CREATED, IF YES THEN REDIRECT TO EDIT PAGE
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }

    // AFTER CREATING PRODUCT, LOAD IN PRODUCTS AGAIN, ADD successCreate IN DEPENDENCIES
    // AFTER DELETING PRODUCT, LOAD IN PRODUCTS AGAIN, ADD successDelete IN DEPENDENCIES
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  /* HANDLER */
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProcutHandler = () => {
    dispatch(createProduct());
  };

  return (
          <div style={{marginTop : "130px"}} className="container">
            <div className="row">
              <div style={{width: '1800px'}} className="col-md-offset-1 col-md-10">
                <div className="panel">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col col-sm-3 col-xs-12">
                        <h4 className="title">Products <span>List</span></h4>
                      </div>
                      <div className="col-sm-9 col-xs-12 text-right">
                        <div className="btn_group">
                   
                          <button onClick={createProcutHandler} className="btn btn-default" title="Reload">Create Product</button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  
        {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="panel-body table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>CATEGORY</th>
                          <th>BAND</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      {products.map((product) => (<tbody>
                       
                      <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td>
                            <ul className="action-list">
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                   <li> <a href="#" data-tip="edit"><i className="fa fa-edit" /></a></li>
                             </LinkContainer>

                              <li><button onClick={() => deleteHandler(product._id)}>
                              <a  data-tip="delete"><i className="fa fa-trash" /></a>
                                </button></li>
                            </ul>
                          </td>
                        </tr>
                     
                        
                </tbody>
              ))}
                        


                      
                    </table>
                  </div>
      )}


                  <div className="panel-footer">
                    <div className="row">
                     <Paginate pages={pages} page={page} isAdmin={true} />
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

  );
}

export default ProductListScreen;
