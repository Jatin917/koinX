import { mongoose } from "mongoose";

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic", "ethereum"],
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

export default currencySchema = mongoose.model("currencySchema", currencySchema);