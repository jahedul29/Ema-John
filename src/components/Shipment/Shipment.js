import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import { getDatabaseCart } from "../../utilities/databaseManager";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const cartItems = getDatabaseCart();
    const order = {
      ...loggedInUser,
      products: cartItems,
      shipment: data,
      orderDate: new Date(),
    };

    fetch("https://ema-john-server-jahed.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        ref={register({ required: true })}
        placeholder="Your Name"
        defaultValue={loggedInUser.name}
      />
      {errors.name && <span className="error">Name field is required</span>}

      <input
        name="email"
        ref={register({ required: true })}
        placeholder="Your Email"
        defaultValue={loggedInUser.email}
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Your Address"
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        name="phone"
        ref={register({ required: true })}
        placeholder="Your Phone Number"
      />
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
