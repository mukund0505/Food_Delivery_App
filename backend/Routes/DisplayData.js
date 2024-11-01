import express from "express";
import { foodCategory, foodData } from "../db.js";

const router = express.Router();

router.post("/foodCollection", async (req, res) => {
  try {
    res.send([foodData, foodCategory]);
  } catch (error) {
    console.log("error", error);
    res.send("server error");
  }
});

export default router;
