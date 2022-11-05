import React, { useEffect } from "react";
import Paginate from "../components/Paginate";
/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";
import './productlist.css'
/* REACT BOOTSTRAP */
import { Table, Button } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listUsers, deleteUser } from "../actions/userActions";

function UserListScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const userList = useSelector((state) => state.userList);
  const { users, pages, page, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // WE NEED THE SUCCESS VALUE SO WHEN WE SUCCESSFULLY DELETE THE USER WE WANT THE NEW DATA
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  /* HANDLER */
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user ?"))
      dispatch(deleteUser(id));
  };

  return (
    <div style={{ marginTop: "130px" }} className="container">
      <div className="row">
        <div style={{ width: "1800px" }} className="col-md-offset-1 col-md-10">
          <div className="panel">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-sm-3 col-xs-12">
                  <h4 className="title">
                    Users <span>List</span>
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
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>ADMIN</th>
                      <th> </th>
                    </tr>
                  </thead>

                  {users.map((user) => (
                    <tbody>
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.isAdmin ? (
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>

                        <td>
                          <ul className="action-list">
                            <LinkContainer
                              to={`/admin/user/${user._id}/edit`}
                            >
                              <li>
                                {" "}
                                <a href="#" data-tip="edit">
                                  <i className="fa fa-edit" />
                                </a>
                              </li>
                            </LinkContainer>

                            <li>
                              <button
                                onClick={() => deleteHandler(user._id)}
                              >
                                <a data-tip="delete">
                                  <i className="fa fa-trash" />
                                </a>
                              </button>
                            </li>
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

export default UserListScreen;
