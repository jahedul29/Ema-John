import React, { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://ema-john-server-jahed.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (products.length) {
      const cartFromDatabase = getDatabaseCart();
      const productKeys = Object.keys(cartFromDatabase);

      fetch("https://ema-john-server-jahed.herokuapp.com/getCartProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productKeys),
      })
        .then((res) => res.json())
        .then((data) => setCart(data));

      // const cartProducts = productKeys.map((key) => {
      //   const cartProductFromKey = products.find((pd) => pd.key === key);
      //   cartProductFromKey.quantity = cartFromDatabase[key];
      //   return cartProductFromKey;
      // });
      // setCart(cartProducts);
    }
  }, [products]);

  const handleAddProduct = (product) => {
    const sameProduct = cart.find((pd) => pd.key === product.key);
    let count = 1;
    let newCart = [];
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      product.quantity = count;
      const otherProduct = cart.filter((pd) => pd.key !== product.key);
      newCart = [...otherProduct, product];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    addToDatabaseCart(product.key, count);
    setCart(newCart);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="product-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
