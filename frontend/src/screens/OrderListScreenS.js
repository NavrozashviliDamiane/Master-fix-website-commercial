import React, { useEffect } from "react";
import "./productlist.css"
/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../components/Paginate";
/* REACT BOOTSTRAP */
import { Table, Button } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listOrders } from "../actions/orderActions";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const orderList = useSelector((state) => state.orderList);
  const { orders, pages, page,  loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  /* HANDLER */

  return (
    <div style={{ marginTop: "130px" }} className="container">
      <div className="row">
        <div style={{ width: "1800px" }} className="col-md-offset-1 col-md-10">
          <div className="panel">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-sm-3 col-xs-12">
                  <h4 className="title">
                    Orders <span>List</span>
                  </h4>
                </div>
                <div className="col-sm-9 col-xs-12 text-right"></div>
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
                      <th>USER</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th> </th>
                    </tr>
                  </thead>

                  {orders.map((order) => (
                    <tbody>
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.User && order.User.name}</td>
                        <td>
                          {order.createdAt && order.createdAt.substring(0, 10)}
                        </td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>

                        <td>
                          {order.isDeliver ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>

                        <td>
                          <ul className="action-list">
                            <LinkContainer to={`/order/${order._id}/edit`}>
                              <li>
                              <button >
                                <a data-tip="details">
                                  Details
                                </a>
                              </button>
                              </li>
                            </LinkContainer>

                            
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

export default OrderListScreen;
