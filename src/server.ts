import express from 'express';
import router from './routes/index';

const app = express();
const port = 3000;

app.use('/', router);

app.listen(port, (): void => {
  console.log(`listening on port ${port}`);
  console.log(`server url is http://localhost:${port}`);
});

export default app;
