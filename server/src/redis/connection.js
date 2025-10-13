const Redis = require("ioredis");

// Single shared instances
let redis, pubClient, subClient;

// Establish connection with redis
const connectToRedis = () => {
    if(!redis)
    {
        // Redis config
        redis = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD
        });

        // Connect to redis
        redis.on("connect", () => console.log("Redis connected successfully"));
        redis.on("error", (error) => console.error("Redis connection error:", error.message));

        // Pub-client
        pubClient = redis;

        // Sub-client
        subClient = pubClient.duplicate();   
    }
    return { redis, pubClient, subClient };
};

module.exports = connectToRedis;