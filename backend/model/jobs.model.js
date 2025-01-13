import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  customer: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
    required: true,
    trim: true,
  },
  zone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  land_mark: {
    type: String,
    required: true,
    trim: true,
  },
  image: {type:String},

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  riders: {
      type : String,
      default : '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model('Product', ProductSchema);
