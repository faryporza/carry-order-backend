import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find().populate("product_id");
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product_id");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id).populate("product_id");

    if (!deleted) {
      return res.status(404).json({ error: "Order not found" });
    }
    // คืน object ที่ถูกลบกลับไป
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// เพิ่มฟังก์ชันสำหรับแก้ไข (PUT)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("product_id");
    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};