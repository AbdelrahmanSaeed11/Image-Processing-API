import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Testing Image Processing End points', () => {
  it('Test "/api/image" with correct URL (make it success)', async () => {
    const res = await request.get(
      '/api/image?filename=fjord&width=500&height=500'
    );
    expect(res.status).toBe(200);
  });

  it('Test "/api/image" with missing parametars (make it fail)', async () => {
    const res = await request.get('/api/image?width=300&height=300');
    expect(res.text).toEqual(
      '<h2 style="text-align: center;">There are missing parameters in the url</h2>'
    );
    expect(res.status).toBe(400);
  });

  it('Test "/api/image" with negative width/height value (make it fail)', async () => {
    const res = await request.get(
      '/api/image?filename=fjord&width=500&height=-500'
    );
    expect(res.text).toEqual(
      '<h2 style="text-align: center;">Width/Height should be greater than zero</h2>'
    );
    expect(res.status).toBe(400);
  });

  it('Test "/api/image" wiht wrong filename (make it fail)', async () => {
    const res = await request.get(
      '/api/image?filename=wrongname&width=500&height=500'
    );
    expect(res.text).toEqual(
      '<h2 style="text-align: center;">There is no such an image file with this name</h2>'
    );
    expect(res.status).toBe(400);
  });

  it('Test "/api/image/original" with correct filename', async () => {
    const res = await request.get('/api/image/original?filename=palmtunnel');
    expect(res.status).toBe(200);
  });

  it('Test "/api/image/original" with wrong filename', async () => {
    const res = await request.get('/api/image/original?filename=wrongname');
    expect(res.text).toEqual(
      '<h2 style="text-align: center;">There is no such an image file with this name</h2>'
    );
    expect(res.status).toBe(400);
  });

  it('Test "/api/image/original" without filename', async () => {
    const res = await request.get('/api/image/original');
    expect(res.text).toEqual(
      '<h2 style="text-align: center;">You Should enter the image filename</h2>'
    );
    expect(res.status).toBe(400);
  });
});
