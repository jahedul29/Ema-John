import React from "react";
import "./Review.css";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import { useState } from "react";
import { useEffect } from "react";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import ThankYouImage from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const history = useHistory();

  const removeItem = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    removeFromDatabaseCart(productKey);
    setCart(newCart);
  };

  const handleCheckout = () => {
    history.push("/shipment");
  };

  useEffect(() => {
    const cartDataFromDatabase = getDatabaseCart();
    const cartProductKeys = Object.keys(cartDataFromDatabase);

    fetch("https://ema-john-server-jahed.herokuapp.com/getCartProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartProductKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));

    // const cartProduct = cartProductKeys.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = cartDataFromDatabase[key];
    //   return product;
    // });
    // setCart(cartProduct);
  }, []);

  let placedImage;
  if (isOrderPlaced) {
    placedImage = <img src={ThankYouImage} alt="" />;
    processOrder();
  }

  const heading = isOrderPlaced ? "Order Placed" : "Review Ordered Items";

  return (
    <>
      {cart.length || isOrderPlaced ? (
        <div className="review-container">
          <div className="product-container">
            <h1>{heading}</h1>

            {cart.map((pd) => (
              <ReviewItem
                key={pd.key}
                removeItem={removeItem}
                product={pd}
              ></ReviewItem>
            ))}
            {placedImage}
          </div>
          <div className="cart-container">
            <Cart cart={cart}>
              <button className="product-button" onClick={handleCheckout}>
                Proceed Checkout
              </button>
            </Cart>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h1 style={{ color: "red", lineHeight: "20px" }}>Sorry!</h1>
          <h2 style={{ color: "orange" }}>You have no items in Cart.</h2>
          <h2 style={{ color: "green" }}>Please order something</h2>
        </div>
      )}
    </>
  );
};

export default Review;
