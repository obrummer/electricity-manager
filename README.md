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

Backend uses [MongoDB Atlas](https://www.mongodb.com/atlas/database) as database. In order to run the app you need to start using the service. Or then you can use a local MongoDB. Environment variables are set in .env file and project contains .envExample including sample variables. 

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











