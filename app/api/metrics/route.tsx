import { register, collectDefaultMetrics } from 'prom-client';

collectDefaultMetrics();

export async function GET(req: any, res:any){
    try {
        const metrics = await register.metrics();
        return Response.json({ metrics })
    } catch (err:any) {
        return Response.json({ err })
    }
}

export async function POST(req: any, res:any){
    res.setHeader('Content-Type', register.contentType);
    try {
        const metrics = await register.metrics();
        return Response.json({ metrics })
    } catch (err:any) {
        return Response.json({ err })
    }
}
