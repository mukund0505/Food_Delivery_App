import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  const options = props.options;
  const priceOptions = Object.keys(options);

  const dispatch = useDispatchCart();
  const data = useCart();

  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddtoCart = async () => {
    if (!localStorage.getItem("authToken")) {
      alert("Please log in to add items to the cart.");
      return; // Exit the function if not logged in
    }

    const finalPrice = qty * parseInt(options[size]);
    const existingItem = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    if (existingItem) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "16rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "140px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => setQty(parseInt(e.target.value))}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>

              <div className="d-inline h-100 fs-5">
                ₹{qty * parseInt(options[size])}/-
              </div>
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
