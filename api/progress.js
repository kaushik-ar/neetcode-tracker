import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await redis.get("nc250_v1");
    return res.json(data || { p: {}, r: {} });
  }
  if (req.method === "POST") {
    await redis.set("nc250_v1", req.body);
    return res.json({ ok: true });
  }
  res.status(405).end();
}
