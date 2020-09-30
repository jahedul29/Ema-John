import React from "react";

const Inventory = () => {
  const product = {};
  const handleAddProduct = () => {
    fetch("https://ema-john-server-jahed.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h2>Inventory is coming soon..........</h2>
      <form action="/addProduct">
        <p>
          <span>Name</span>
          <input type="text" />
        </p>
        <p>
          <span>Price</span>
          <input type="text" />
        </p>
        <p>
          <span>Quantity</span>
          <input type="text" />
        </p>
        <p>
          <span>Image</span>
          <input type="file" />
        </p>
        <button type="submit" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Inventory;
