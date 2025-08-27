import { connect } from "mongoose";

export default async function connectDB() {
  try {
    const conn = await connect(process.env.MONGO_URI);
    if (!conn)
      throw new Error("error encountered while connecting to database");

    console.log(`connected to ${conn.connection.host} successfully`);
  } catch (err) {
    console.error(err);
  }
}
