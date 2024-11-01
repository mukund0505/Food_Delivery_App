import express from "express";
import Order from "../models/Orders.js";

const router = express.Router();

router.post("/orderData", async (req, res) => {
  const { email, order_data, order_date } = req.body; // Destructure to check for email directly

  // Log the request body to see what data is being received
  console.log("Request body:", req.body);

  // Check if required fields are present
  if (!email || !order_data || !order_date) {
    return res
      .status(400)
      .json({ error: "Missing email, order data, or order date" });
  }

  // Prepare order data
  let data = order_data;
  data.splice(0, 0, { Order_date: order_date });

  try {
    // Check if an order already exists for this email
    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // If no order exists, create a new order document
      await Order.create({
        email,
        order_data: [data],
      });
      res.json({ success: true });
    } else {
      // If order exists, update it by pushing the new order data
      await Order.findOneAndUpdate({ email }, { $push: { order_data: data } });
      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ error: "Server Error", details: error.message });
  }
});

router.post("/myorderData", async (req, res) => {
  const { email } = req.body; // Extract email from the request body

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Fetch the order data for the provided email
    let myData = await Order.findOne({ email });
    res.json({ orderData: myData });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ error: "Server Error", details: error.message });
  }
});

export default router;
