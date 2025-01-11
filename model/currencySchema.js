import { mongoose } from "mongoose";

const currency = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic-network", "ethereum"],
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export const currencySchema = mongoose.model("currencySchema", currency);