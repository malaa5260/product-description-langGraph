import { createServer } from 'node:http';

const port = Number(process.env.PORT ?? 3000);

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      try {
        resolve(body === '' ? {} : JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    request.on('error', reject);
  });
}

function writeJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(data));
}

function createLearningDescription(productName, specifications) {
  return [
    `${productName} منتج عملي مناسب للاستخدام اليومي.`,
    `يتميز بـ${specifications}.`,
    'الوصف الحالي صادر من سيرفر تعليمي، والخطوة التالية هي استبداله باستدعاء AI حقيقي.',
  ].join(' ');
}

const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    writeJson(response, 204, {});
    return;
  }

  if (request.method !== 'POST' || request.url !== '/api/generate-description') {
    writeJson(response, 404, { error: 'Not found' });
    return;
  }

  try {
    const body = await readJson(request);
    const productName = String(body.productName ?? '').trim();
    const specifications = String(body.specifications ?? '').trim();

    if (productName === '' || specifications === '') {
      writeJson(response, 400, { error: 'Product name and specifications are required.' });
      return;
    }

    // Slide 4: server-side generation placeholder before adding a real AI model.
    writeJson(response, 200, {
      description: createLearningDescription(productName, specifications),
    });
  } catch {
    writeJson(response, 500, { error: 'Failed to generate description.' });
  }
});

server.listen(port, () => {
  console.log(`Description API is running on http://localhost:${port}`);
});
