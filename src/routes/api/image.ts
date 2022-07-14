import express from 'express';
import Myimage from '../../models/image';

const imageRounter = express.Router();

imageRounter.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename: string = req.query.filename as string;
    const width: string = req.query.width as string;
    const hight: string = req.query.height as string;

    if (!filename || !width || !hight) {
      res
        .status(400)
        .send(
          '<h2 style="text-align: center;">There are missing parameters in the url</h2>'
        );
    } else if (parseInt(width) <= 0 || parseInt(hight) <= 0) {
      res
        .status(400)
        .send(
          '<h2 style="text-align: center;">Width/Height should be greater than zero</h2>'
        );
    } else {
      try {
        const image = new Myimage(filename, parseInt(width), parseInt(hight));
        const retPath: string = await image.processImage();
        res.status(200).sendFile(retPath);
      } catch (error) {
        const e: Error = error as Error;
        res.status(400).send(e.message);
      }
    }
  }
);

imageRounter.get(
  '/original',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename: string = req.query.filename as string;
    if (!filename) {
      res
        .status(400)
        .send(
          '<h2 style="text-align: center;">You Should enter the image filename</h2>'
        );
    } else {
      try {
        const image = new Myimage(filename, 0, 0);
        const retPath: string = await image.getImage();
        res.status(200).sendFile(retPath);
      } catch (error) {
        const e: Error = error as Error;
        res.status(400).send(e.message);
      }
    }
  }
);

export default imageRounter;
