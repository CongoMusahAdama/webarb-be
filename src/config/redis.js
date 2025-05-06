import redis from "redis";

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis error:", err));

// Automatically connect when required
(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected successfully");
    }
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();

export default redisClient;
