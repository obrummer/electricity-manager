# Electricity Manager

This is a fullstack demo app to simulate simple electricity management. The main functionalities are:

- to show electricity stock price in Finland
- to be able to create electricity switches which can be configured to be active/non-active based on the high limit price that the user sets

Technologies used: Typescript, React, Redux Toolkit, Eslint, Prettier, Material UI, Node/Express, MongoDB Atlas

## Getting started with Frontend

Frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

```bash
npm install
```

and

```bash
npm start
```

to run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
npm run build
```

builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Getting started with Backend

Backend uses [MongoDB Atlas](https://www.mongodb.com/atlas/database) as database. In order to run the app you need to start using the service. Or then you can use a local MongoDB. Environment variables are set in .env file and project contains .env.example including sample variables.

For getting the electrity price data, project uses [ENTSO-E Transparency Platform RESTful API](https://transparency.entsoe.eu/). API specification can be found [here](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html).

To get access to an security token you need to register the Transparency Platform and send an email to transparency@entsoe.eu with “Restful API access” in the subject line. Indicate the email address you entered during registration in the email body. When granted access there will be an option to generate an security token under account settings.

When you have database connected and token available you you can run in the project directory:

```bash
npm install
```

and

```bash
npm run dev
```

to run the app in the development mode.

To make a production build run:

```bash
npm run tsc
```

and run the production version:

```bash
npm run start
```

## Running tests

Frontend -tests are component/unit -tests written with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). Tests can be run in frontend directory by running:

```bash
npm run test
```

Backend -tests includes unit tests written with [Jest](https://jestjs.io/) and API integration tests written with [Supertest](https://www.npmjs.com/package/supertest) -library. Running the tests at backend requires own database which will be set in environment variables. Check the variable model from .env.example file. After setting the variable tests can be run in backend directory by running:

```bash
npm run test
```

Application e2e tests are written with [Cypress](https://www.cypress.io/) and the code can be found in frontend directory under cypress -folder. Cypress tests use the same test database as the API tests so in order to run the tests you need to first start the backend with right env variables by running the following script in backend directory:

```bash
npm run start:test
```

Next you need to start the frontend and after that open the Cypress UI by running following script in frontend directory:

```bash
npm run cypress:open
```

Now youjn can run the tests through Cypress ui. If you want to run the tests headless, run the script:

```bash
npm run cypress:run
```

## Roadmap

App is being deployed with using Docker and [Fly](https://fly.io/). Next steps for the application are:

- User management and authentication
- Server for handling the switches
