# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run start:api`

Runs the mock backend, pre-populates it with generated data. Data in the app is persisted in the local storage so when
there's no data (initially or after `localStorage.clear()`), it will be retrieved from the mock backend. The backend is
also used in CRUD operations.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Dev notes

1. Additional tests weren't implented since Puppeteer has issues working on M1 Mac and that+Jest was what I was going for
2. A lot of accessibility is provied out of the box with Bootstrap; I also ran Lighthouse Accessibility check (after saving the page as HTML) and got 100
