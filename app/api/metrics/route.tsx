import { register, collectDefaultMetrics } from 'prom-client';
import { NextResponse } from 'next/server';

collectDefaultMetrics();

export async function GET() {
  try {
    const metrics = await register.metrics();

    const headers = new Headers();
    headers.set('Content-Type', register.contentType);

    return new NextResponse(metrics, { status: 200, headers });
  } catch (err: any) {
    return new NextResponse(`Erro ao coletar métricas: ${err.message}`, { status: 500 });
  }
}

export async function POST() {
  try {
    const metrics = await register.metrics();

    const headers = new Headers();
    headers.set('Content-Type', register.contentType);

    return new NextResponse(metrics, { status: 200, headers });
  } catch (err: any) {
    return new NextResponse(`Erro ao coletar métricas: ${err.message}`, { status: 500 });
  }
}

