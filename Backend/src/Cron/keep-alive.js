import cron from "node-cron";
import axios from "axios";

export default function keepAlive() {
  if (["prod", "production"].includes(process?.env?.NODE_ENV || "")) {
    cron.schedule("*/5 * * * *", async () => {
      try {
        await axios.get(`${process.env.BASE_URL}`);
        console.log("Self-ping sent at", new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Self-ping failed:", err.message);
      }
    });
  }
}
