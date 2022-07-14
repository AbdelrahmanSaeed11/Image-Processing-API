# Image Processing API

## Available Scripts to run 
1. Command to run the server without compile to javascript and using nodemon
```bash
npm run start
```
2. Command to build the Project to javascript and create the dist folder
```bash
npm run build
```
3. Command to run the tests that main with jasmine 
```bash
npm run test
```
4. Command to lint the project files
```bash
npm run lint
```
5. Command to prettify the project files
```bash
npm run prettier
```

## End Points
1. End point to access the main page
> <http://localhost:3000>
2. End point to access the Image processing API
> <http://localhost:3000/api/image>
3. End point to access the original image API
> <http://localhost:3000/api/image/original>

### Notes
1. To use the image processing API correctly you have to provide the following query parametars in the URL
* filename that indicate the image file name you want to process
* width that indicate the new image width
* height that indicate the new image height
#### Exapmle 
> <http://http://localhost:3000/api/image?filename=icelandwaterfall&width=500&height=500>
2. To use the original image API correctly you have to provide the following query parametars in the URL
* filename that indicate the image file name you want to retrieve
#### Example
> <http://http://localhost:3000/api/image/original?filename=icelandwaterfall>