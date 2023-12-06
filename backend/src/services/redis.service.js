"use strict";

const redis = require("redis");
const { promisify } = require("util");
const { reservationInventory } = require("../models/repositories/inventory.repo");
const redisClient = redis.createClient();

const pexpire = promisify(redisClient.pExpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setNX).bind(redisClient);
const delAsyncKey = promisify(redisClient.del).bind(redisClient);

const acquireLock = async (productId, quantity, cartId) => {
  const key = `lock_v2023${productId}`;

  const retryTimes = 10;
  const expireTime = 3000; // 3 seconds

  for (let i = 0; i < retryTimes; i++) {
    // create key
    const result = await setnxAsync(key, expireTime);
    console.log(`Result:::`, result);
    if (result === 1) {
      //
      const isReversation = await reservationInventory({ productId, quantity, cartId });

      if (isReversation.modifiedCount) {
        await pexpire(key, expireTime);
        return key;
      }

      return null;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
};

const releaseLock = async (keyLock) => {
  return await delAsyncKey(keyLock);
};

module.exports = {
  acquireLock,
  releaseLock,
};
