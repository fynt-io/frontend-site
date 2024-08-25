import { register, collectDefaultMetrics } from 'prom-client';

collectDefaultMetrics();

export async function GET(req: any, res: any) {
  try {
    const metrics = await register.metrics();
    res.setHeader('Content-Type', register.contentType);
    res.status(200).send(metrics);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function POST(req: any, res: any) {
  try {
    const metrics = await register.metrics();
    res.setHeader('Content-Type', register.contentType);
    res.status(200).send(metrics);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

