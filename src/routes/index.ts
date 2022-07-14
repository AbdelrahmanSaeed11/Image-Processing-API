import express from 'express';
import imageRounter from './api/image';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response): void => {
  const page = `<h1 style="text-align: center;">Hello to my Image Processing API Project</h1>`;
  res.status(200).send(page);
});

router.use('/api/image', imageRounter);
export default router;
