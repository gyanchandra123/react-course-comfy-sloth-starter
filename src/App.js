import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
// these 3 component will be display in every pages.
import {
  Home,
  Products,
  PrivateRoute,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/products" exact>
          <Products />
        </Route>

        <Route path="/products/:id" children={<SingleProduct />} exact>
          <Products />
        </Route>

        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>

        <Route path="/checkout" exact>
          <Checkout />
        </Route>
        <Route path="*" exact>
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
