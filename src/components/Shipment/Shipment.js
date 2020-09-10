import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useContext } from "react";
import { UserContext } from "../../App";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        ref={register({ required: true })}
        placeholder="Your Name"
        defaultValue={loggedInUser.name}
      />
      {errors.exampleRequired && (
        <span className="error">Name field is required</span>
      )}

      <input
        name="email"
        ref={register({ required: true })}
        placeholder="Your Email"
        defaultValue={loggedInUser.email}
      />
      {errors.exampleRequired && (
        <span className="error">Email is required</span>
      )}

      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Your Address"
      />
      {errors.exampleRequired && (
        <span className="error">Address is required</span>
      )}

      <input
        name="phone"
        ref={register({ required: true })}
        placeholder="Your Phone Number"
      />
      {errors.exampleRequired && (
        <span className="error">Phone Number is required</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
