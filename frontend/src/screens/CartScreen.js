import React, { useEffect } from "react";

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
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  /* GETTING DATA FROM URL IF PRESENT */
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //qty: '?qty=3' -> ['?qty',3] -> 3

  /* FIRING OFF DISPATCH, BUT ONLY IF WE HAVE A PRODUCT ID & QUANTITY */
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /* HANDLERS */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div style={{ marginTop : "80px" }}>
      {/* breadcrumb */}
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <Link to='/'><a  className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a></Link>
          <span className="stext-109 cl4">Shoping Cart</span>
        </div>
      </div>
      {/* Shoping Cart */}

      {cartItems.length === 0 ? (
        <form className="bg0 p-t-75 p-b-85">
        <div className="container">
        <Message variant="info">
          Your cart is empty. <Link to="/shop">Add Products from Master-Shop</Link>
        </Message>
        </div>
        </form>
      ) : (
        <form className="bg0 p-t-75 p-b-85">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                <div className="m-l-25 m-r--38 m-lr-0-xl">
                  <div className="wrap-table-shopping-cart">
                    <table className="table-shopping-cart">
                      <tbody>
                        <tr className="table_head">
                          <th className="column-1">Product</th>
                          <th className="column-2" />
                          <th className="column-3">Price</th>
                          <th className="column-4">Quantity</th>
                          <th className="column-5"></th>
                        </tr>

                        {cartItems.map((item) => (
                          <tr key={item.product} className="table_row">
                            <td className="column-1">
                              <div className="how-itemcart1">
                                <img src={item.image} alt={item.name} />
                              </div>
                            </td>
                            <Link to={`/product/${item.product}`}>
                              <td className="column-2">{item.name}</td>
                            </Link>
                            <td className="column-3">$ {item.price}</td>
                            <td className="column-4">
                              <div className="wrap-num-product flex-w m-l-auto m-r-0">
                                <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"></div>

                                <select
                                  as="select"
                                  value={item.qty}
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                  className="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  name="num-product1"
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>

                                <button
                                  type="button"
                                  variant="light"
                                  onClick={() =>
                                    removeFromCartHandler(item.product)
                                  }
                                  className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                    <div className="flex-w flex-m m-r-20 m-tb-5">
                      <input
                        className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                        type="text"
                        name="coupon"
                        placeholder="Coupon Code"
                      />
                      <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                        Apply coupon
                      </div>
                    </div>
                    <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
                      Update Cart
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                  <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

                  <div className="flex-w flex-t bor12 p-b-13">
                    <div className="size-208">
                      <span className="stext-110 cl2">Items:</span>
                    </div>
                    <div className="size-209">
                      <span className="mtext-110 cl2">
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </span>
                    </div>
                  </div>

                  <div className="flex-w flex-t bor12 p-b-13">
                    <div className="size-208">
                      <span className="stext-110 cl2">Subtotal:</span>
                    </div>
                    <div className="size-209">
                      <span className="mtext-110 cl2">
                        $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-w flex-t bor12 p-b-13">
                    <div className="size-208">
                      <span className="stext-110 cl2">Shipping:</span>
                    </div>
                    <div className="size-209">
                      <span className="mtext-110 cl2">$ 0</span>
                    </div>
                  </div>

                  <div className="flex-w flex-t p-t-27 p-b-33">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Total:</span>
                    </div>
                    <div className="size-209 p-t-1">
                      <span className="mtext-110 cl2">
                        $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                  type="button"
                 
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler} className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CartScreen;

