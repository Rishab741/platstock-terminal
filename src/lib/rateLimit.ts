import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Limiters = {
  notify: Ratelimit;
  "access-request": Ratelimit;
};

let limiters: Limiters | null = null;

function getLimiters(): Limiters {
  if (!limiters) {
    const redis = Redis.fromEnv();
    limiters = {
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
  }
  return limiters;
}

export type RateLimitRoute = keyof Limiters;

export async function checkRateLimit(
  route: RateLimitRoute,
  ip: string
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const { success, reset } = await getLimiters()[route].limit(ip);
  return {
    allowed: success,
    retryAfterSeconds: success ? 0 : Math.ceil((reset - Date.now()) / 1000),
  };
}
