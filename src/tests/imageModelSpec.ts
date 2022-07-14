import Myimage from '../models/image';
import { promises as fs } from 'fs';
import path from 'path';

describe('Test image processing model', () => {
  beforeAll(async () => {
    const thumbPath: string = path.resolve('./images/thumb');
    let thumbExist: boolean;
    try {
      await fs.access(thumbPath);
      thumbExist = true;
    } catch (e) {
      thumbExist = false;
    }
    if (thumbExist) {
      const files = await fs.readdir(thumbPath);
      for (let i = 0; i < files.length; ++i) {
        await fs.unlink(path.resolve(`./images/thumb/${files[i]}`));
      }
    }
  });

  it('Test to process an image', async () => {
    const res = await new Myimage('fjord', 200, 200).processImage();
    expect(res).toEqual(path.resolve('./images/thumb/fjord_200_200.jpg'));
  });

  it('Test that the processed image is saved', async () => {
    const res = await new Myimage('fjord', 200, 200).isProcessed();
    expect(res).toEqual(true);
  });

  it('Test image with wrong filename', async () => {
    try {
      await new Myimage('wrongname', 200, 200).isProcessed();
    } catch (e) {
      const error: Error = e as Error;
      expect(error).toEqual(
        new Error(
          '<h2 style="text-align: center;">There is no such an image file with this name</h2>'
        )
      );
    }
  });
});
