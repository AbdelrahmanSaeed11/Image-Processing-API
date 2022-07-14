import { promises as fs } from 'fs';
import path from 'path';
import Jimp from 'jimp';

class Myimage {
  fileName: string;
  height: number;
  width: number;
  constructor(filename: string, width: number, height: number) {
    this.fileName = filename;
    this.height = height;
    this.width = width;
  }
  async isProcessed(): Promise<boolean> {
    try {
      await fs.access(
        path.resolve(
          `./images/thumb/${this.fileName}_${this.width}_${this.height}.jpg`
        )
      );
      return true;
    } catch (e) {
      return false;
    }
  }
  async isExist(): Promise<boolean> {
    try {
      await fs.access(path.resolve(`./images/full/${this.fileName}.jpg`));
      return true;
    } catch (e) {
      return false;
    }
  }
  async resizeImage(): Promise<void> {
    const image = await Jimp.read(
      path.resolve(`./images/full/${this.fileName}.jpg`)
    );
    image.resize(this.width, this.height);
    await image.writeAsync(
      path.resolve(
        `./images/thumb/${this.fileName}_${this.width}_${this.height}.jpg`
      )
    );
  }
  async isThumb(): Promise<boolean> {
    try {
      await fs.access(path.resolve(`./images/thumb`));
      return true;
    } catch (e) {
      return false;
    }
  }
  async processImage(): Promise<string> {
    const thumb: boolean = await this.isThumb();
    if (!thumb) {
      fs.mkdir(path.resolve(`./images/thumb`));
    }
    let retPath: string;
    const processed: boolean = await this.isProcessed();
    if (processed) {
      retPath = path.resolve(
        `./images/thumb/${this.fileName}_${this.width}_${this.height}.jpg`
      );
      return retPath;
    }
    const exist: boolean = await this.isExist();
    if (!exist) {
      throw new Error(
        '<h2 style="text-align: center;">There is no such an image file with this name</h2>'
      );
    }
    try {
      await this.resizeImage();
    } catch {
      throw new Error(
        '<h2 style="text-align: center;">Wrong Widht/Height values</h2>'
      );
    }
    retPath = path.resolve(
      `./images/thumb/${this.fileName}_${this.width}_${this.height}.jpg`
    );
    return retPath;
  }
  async getImage(): Promise<string> {
    const exist: boolean = await this.isExist();
    if (!exist) {
      throw new Error(
        '<h2 style="text-align: center;">There is no such an image file with this name</h2>'
      );
    }
    return path.resolve(`./images/full/${this.fileName}.jpg`);
  }
}
export default Myimage;
