import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  store: { type: String },
  price: { type: Number, required: true },
  url: { type: String },
  note: { type: String },
  status: { type: String, default: "available" },
  created_at: { type: Date, default: Date.now },

  // เพิ่ม field สำหรับ radio/checkbox
  options: {
    toppings: [{ type: String }], // checkbox → เก็บหลายค่า
    size: [{ type: String }]      // radio → เก็บหลายตัวเลือก แต่เวลา order จะเลือกได้อันเดียว
  }
});

export default mongoose.model("Product", productSchema);
