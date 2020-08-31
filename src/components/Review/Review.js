import React from "react";
import "./Review.css";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder,
} from "../../utilities/databaseManager";
import { useState } from "react";
import { useEffect } from "react";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import ThankYouImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const removeItem = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    removeFromDatabaseCart(productKey);
    setCart(newCart);
  };

  const placeOrder = () => {
    processOrder();
    setIsOrderPlaced(true);
    setCart([]);
  };

  useEffect(() => {
    const cartDataFromDatabase = getDatabaseCart();
    const cartProductKeys = Object.keys(cartDataFromDatabase);

    const cartProduct = cartProductKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = cartDataFromDatabase[key];
      return product;
    });
    setCart(cartProduct);
  }, []);

  let placedImage;
  if (isOrderPlaced) {
    placedImage = <img src={ThankYouImage} alt="" />;
  }

  let heading;
  if (isOrderPlaced) {
    heading = "Order Placed";
  } else {
    heading = "Review Ordered Items";
  }

  return (
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
          <button onClick={placeOrder}>Place Order</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
