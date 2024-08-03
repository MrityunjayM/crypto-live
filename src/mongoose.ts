import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

async function conncetToMongo() {
  return await mongoose.connect(MONGO_URI);
}

conncetToMongo().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
