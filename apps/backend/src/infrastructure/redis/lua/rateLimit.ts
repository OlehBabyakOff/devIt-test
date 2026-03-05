export const rateLimitLua = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local window = tonumber(ARGV[3])
local uuid = ARGV[4]

redis.call("ZREMRANGEBYSCORE", key, 0, now - window)

local current = redis.call("ZCARD", key)

if current >= limit then
    return 0
end

redis.call("ZADD", key, now, uuid)
redis.call("PEXPIRE", key, window)

return 1
`;

