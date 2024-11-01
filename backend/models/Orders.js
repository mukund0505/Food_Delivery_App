import mongoose from "mongoose"; // Import mongoose
const { Schema } = mongoose; // Destructure Schema from mongoose

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});

// Export the Order model
const Order = mongoose.model("Order", OrderSchema);

export default Order;
