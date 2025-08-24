import Order from "../models/Order.js";

// GET all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product_id");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET order by id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product_id");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// CREATE order
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    await order.populate("product_id");

    // emit new-order
    const io = req.app.get("io");
    if (io) io.emit("new-order", order);

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("product_id");

    if (!updated) return res.status(404).json({ error: "Order not found" });

    // emit update-order
    const io = req.app.get("io");
    if (io) io.emit("update-order", updated);

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id).populate("product_id");

    if (!deleted) return res.status(404).json({ error: "Order not found" });

    // emit delete-order
    const io = req.app.get("io");
    if (io) io.emit("delete-order", deleted);

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};