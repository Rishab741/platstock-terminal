import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const limiters = {
  notify: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    prefix: "rl:notify",
  }),
  "access-request": new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "600 s"),
    prefix: "rl:access-request",
  }),
};

export type RateLimitRoute = keyof typeof limiters;

export async function checkRateLimit(
  route: RateLimitRoute,
  ip: string
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const { success, reset } = await limiters[route].limit(ip);
  return {
    allowed: success,
    retryAfterSeconds: success ? 0 : Math.ceil((reset - Date.now()) / 1000),
  };
}
