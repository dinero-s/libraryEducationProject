const redisClient = require('../lib/redis-client');

const incr = async (req, res) => {

    const id = req.params.id;
    const key = `book:${id}:views`;

    await redisClient.incr(key);
}

const getCounter = async (req, res) => {
    const id = req.params.id;
    const key = `book:${id}:views`;

    const count = await redisClient.get(key) || 0;
    res.json({ count: parseInt(count) });
}

module.exports = {
    getCounter,
    incr
}