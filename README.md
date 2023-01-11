# Electricity Manager

This is a fullstack demo app to simulate simple electricity management. It's main functionalities include:

- Displaying the current electricity stock price in Finland
- Allowing users to create electricity switches that can be configured to be active or inactive based on the high limit price set by the user

The app is built using the following technologies: TypeScript, React, Redux Toolkit, ESLint, Prettier, Material UI, Node/Express, Mongoose, MongoDB Atlas, Jest, React Testing Library and Cypress.

## Getting started with Frontend

Frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run the app in development mode, navigate to the project's frontend directory and run the following commands:

```bash
npm install
npm start
```

This will open [http://localhost:3000](http://localhost:3000) in the browser. The page will reload if any edits are made, and any lint errors will be displayed in the console.

To build the app for production, run:

```bash
npm run build
```

This will build the app for production to the `build` folder and optimize it for the best performance. The build will be minified and the filenames will include hashes. Once the app is built, it is ready to be deployed.

## Getting started with Backend

The backend uses [MongoDB Atlas](https://www.mongodb.com/atlas/database) as the database. To run the app, you will need to start using the service or set up a local MongoDB. Environment variables are set in the .env file, and the project contains an .env.example file with sample variables.

For getting the electrity price data, project uses the [ENTSO-E Transparency Platform RESTful API](https://transparency.entsoe.eu/). The API specification can be found [here](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html).

To get access to a security token, you'll need to register with the Transparency Platform and send an email to transparency@entsoe.eu with "Restful API access" in the subject line. Indicate the email address you used during registration in the body of the email. Once access is granted, you'll be able to generate a security token under account settings.

With the database connected and token available, you can run the following commands in the project's backend directory:

```bash
npm install
```

and

```bash
npm run dev
```

to run the app in the development mode.

To make a production build, run:

```bash
npm run tsc
```

And to run the production version:

```bash
npm run start
```

## Running tests

The frontend tests are component/unit tests written with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). These tests can be run in frontend directory by running:

```bash
npm run test
```

The backend tests includes unit tests written with [Jest](https://jestjs.io/) and API integration tests written with [Supertest](https://www.npmjs.com/package/supertest) -library. Running the tests at backend requires a separate database, which will be set in environment variables. Check the variable model from .env.example file. After setting the variables, tests can be run in the backend directory by running:

```bash
npm run test
```

The application's end-to-end tests are written with [Cypress](https://www.cypress.io/) and can be found in the frontend directory under `cypress` folder. Cypress tests use the same test database as the API tests, so in order to run the tests, you need to first start the backend with the correct environment variables by running the following command in the backend directory:

```bash
npm run start:test
```

Next, you need to start the frontend and after that open the Cypress UI by running the following command in the frontend directory:

```bash
npm run cypress:open
```

Now you can run the tests through the Cypress UI. If you want to run the tests headlessly, run the command:

```bash
npm run cypress:run
```

## Roadmap

The app is being deployed with using Docker and [Fly](https://fly.io/). The next steps for the application include:

- User management and authentication
- A server for handling the switches
