import { getRatesFromHtml } from './getRatesFromHtml';
import { OutputMode } from './types';

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const response = await fetch('https://www.cbr.ru/currency_base/daily/', {
      method: 'GET',
    });

    const url = new URL(request.url);

    const mode = url.searchParams.get('mode') as OutputMode;

    const html = await response.text();
    const rates = mode ? getRatesFromHtml(html, mode) : getRatesFromHtml(html);

    return new Response(JSON.stringify(rates), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
