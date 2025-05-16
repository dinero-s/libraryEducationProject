const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Redis connection failed:', err);
        process.exit(1);
    }
})();

module.exports = redisClient;