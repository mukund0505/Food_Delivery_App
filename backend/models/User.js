import mongoose from "mongoose"; // Import mongoose
const { Schema } = mongoose; // Destructure Schema from mongoose

// Define the User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model
const User = mongoose.model("User", UserSchema);

export default User;
