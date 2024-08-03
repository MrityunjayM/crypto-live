import mongoose, { Schema, Document, Model } from "mongoose";

interface CryptoDoc extends Document {
  geko_id: string;
  symbol: string;
  name: string;
  price: number;
  img_small: string;
}

interface CryptoModel extends Model<CryptoDoc> {}

const cryptoSchema = new Schema<CryptoDoc>(
  {
    geko_id: { type: String, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img_small: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Crypto ||
  mongoose.model<CryptoDoc, CryptoModel>("Crypto", cryptoSchema);
