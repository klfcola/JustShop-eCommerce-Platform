import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Create new order
// POST /api/orders
// Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("add order items");
});

// Get logged in user orders
// GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("get my orders");
});

// Get order by ID
// GET api/orders/:id
// Private
const getOrderByID = asyncHandler(async (req, res) => {
  res.send("Get order by id");
});

// Update order to paid
// GET /api/orders/:id/pay
// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update orer to paid");
});

// Update order to delivered
// GET /api/orders/:id/deliver
// Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update orer to delivered");
});

// Get all orders
// GET /api/orders
// Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
