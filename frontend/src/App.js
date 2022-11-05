/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */

import Header from "./components/Header";
import Footer from "./components/Footer";

import AboutScreen from "./components/AboutScreen";

import CartScreen from "./screens/CartScreen";


import ProfileScreen from "./screens/ProfileScreen";

import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreenS";
import OrderScreen from "./screens/OrderScreenS";
import UserListScreen from "./screens/UserListScreenS";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreenS";
import ProductEditScreen from "./screens/ProductEditScreenS";
import OrderListScreen from "./screens/OrderListScreenS";
import Shop from "./screens/Shop";
import Headers from "./screens/Headers";
import LandingPage from "./screens/LandingPage";

import ProductDetail from "./screens/ProductDetail";
import ContactScreen from "./components/ContactScreen";
import NewLogin from "./screens/newLogin";
import Register from "./screens/NRegister";
import ShippingScreenS from "./screens/ShippingScreenS";
/* REACT ROUTER */
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Headers />
      
          
          <Route exact path="/shop" component={Shop} />

          <Route exact path="/login" component={NewLogin} />
          <Route exact path="/Register" component={Register} />

          <Route exact path="/about" component={AboutScreen} />
          <Route exact path="/contact" component={ContactScreen} />

          <Route exact path="/" component={LandingPage} />
        
          <Route path="/profile" component={ProfileScreen} />

          <Route path="/shipping" component={ShippingScreenS} />

          <Route path="/payment" component={PaymentScreen} />

          <Route path="/placeorder" component={PlaceOrderScreen} />

          <Route path="/order/:id" component={OrderScreen} />

          <Route path="/product/:id" component={ProductDetail} />

          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />

          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

          <Route path="/admin/productlist" component={ProductListScreen} />

          <Route path="/admin/orderlist" component={OrderListScreen} />
    
      
   
    </Router>
  );
}

export default App;
