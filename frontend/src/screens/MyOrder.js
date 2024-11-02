import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyOrder = () => {
  const [orderData, setorderData] = useState(null);

  const fetchMyOrder = async () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      console.error("User email not found in local storage.");
      return;
    }

    try {
      const response = await fetch(`https://food-delivery-app-eim5.onrender.com/api/myorderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setorderData(data.orderData || {}); // Assign the order data to the state
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData && orderData.order_data ? (
            orderData.order_data
              .slice(0)
              .reverse()
              .map((item, index) => (
                <div key={index}>
                  {item.map((arrayData, idx) => (
                    <div key={idx}>
                      {arrayData.Order_date ? (
                        <div className="m-auto mt-5">
                          <div>{arrayData.Order_date}</div>
                          <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            {/* <img
                              src={`http://localhost:5000${arrayData.img}`}
                              className="card-img-top"
                              alt={arrayData.name || "Order Item"}
                              style={{ height: "120px", objectFit: "cover" }}
                            /> */}

                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p>No order data available.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyOrder;
