import mongoose from "mongoose";
import TomDecisions from "../models/Decisions";

main().catch((err) => console.log(err));

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }

  await mongoose.connect(MONGODB_URI);
}

export async function fetchFilteredDecisions(): Promise<string> {
  try {
    console.log("Fetching decisions...");
    const decisions = await TomDecisions.find({})
      .sort({ createdAt: -1 })
      .exec();
    console.log("Decisions fetched:", decisions);
    return JSON.stringify(decisions);
  } catch (error) {
    console.error("Error fetching decisions:", error);
    return JSON.stringify([]);
  }
}
