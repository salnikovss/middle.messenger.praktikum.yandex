import { newServer } from 'mock-xmlhttprequest';
import Http from './Http';

describe('Http', () => {
  const server = newServer({
    get: [
      '/get',
      {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Success' }),
      },
    ],
    post: [
      '/post',
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Not found' }),
      },
    ],
    put: [
      '/put',
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Success' }),
      },
    ],
    delete: ['/delete', { status: 202 }],
  });

  beforeAll(() => {
    server.install();
    Http.baseUrl = '/';
  });

  afterAll(() => {
    server.remove();
  });

  test('GET request', () => {
    return Http.get('/get').then(({ response, status }) => {
      expect(status).toEqual(200);
      expect((response as Record<string, unknown>).message).toContain('Success');
    });
  });

  test('POST request', () => {
    return Http.post('/post').then(({ response, status }) => {
      expect(status).toEqual(404);
      expect((response as Record<string, unknown>).message).toContain('Not found');
    });
  });

  test('PUT request', () => {
    return Http.put('/put').then(({ response, status }) => {
      expect(status).toEqual(200);
      expect((response as Record<string, unknown>).message).toContain('Success');
    });
  });

  test('DELETE request', () => {
    return Http.delete('/delete').then(({ response, status }) => {
      expect(status).toEqual(202);
      expect(response).toEqual('');
    });
  });
});
