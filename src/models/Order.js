import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  customer_name: { type: String },
  customer_contact: { type: String },
  quantity: { type: Number, default: 1 },

  // ตัวเลือกที่ลูกค้าเลือกจริง ๆ
  selected_options: {
    toppings: [{ type: String }], // จาก checkbox
    size: { type: String }        // จาก radio
  },

  note: { type: String },
  status: { type: String, default: "pending" },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
